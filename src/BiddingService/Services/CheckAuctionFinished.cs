using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    /// <summary>
    /// Checks for finished auctions  consequently and update their statuses and then publishes an AuctionFinished event if it finds any.
    /// </summary>
    public class CheckAuctionFinished : BackgroundService
    {
        private readonly ILogger<CheckAuctionFinished> _logger;
        private readonly IServiceProvider _services;
        public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider services)
        {
            _services = services;
            _logger = logger;

        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for finished auctions");

            stoppingToken.Register(() => _logger.LogInformation("=>> Auction check is stopping"));

            while (!stoppingToken.IsCancellationRequested)
            {
                await ControlAuctionFinished(stoppingToken);

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task ControlAuctionFinished(CancellationToken stoppingToken)
        {
            var finishedAuctions = await DB.Find<Auction>()
                .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                .Match(x => !x.Finished)
                .ExecuteAsync(stoppingToken);

            if (finishedAuctions.Count == 0)
            {
                return;
            }

            _logger.LogInformation($"=> Found {finishedAuctions.Count} auctions that have completed");

            using var scope = _services.CreateScope();

            var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach (var auction in finishedAuctions)
            {
                auction.Finished = true;
                await auction.SaveAsync(null, stoppingToken);

                var winningBid = await DB.Find<Bid>()
                .Match(x => x.AuctionId == auction.ID)
                .Match(y => y.BidStatus == BidStatus.Accepted)
                .Sort(y => y.Descending(s => s.Amount))
                .ExecuteFirstAsync(stoppingToken);

                await endpoint.Publish(new AuctionFinished
                {
                    ItemSold = winningBid != null,
                    AuctionId = auction.ID,
                    Winner = winningBid?.Bidder,
                    Amount = winningBid?.Amount,
                    Seller = auction?.Seller,
                }, stoppingToken);
            }
        }
    }
}