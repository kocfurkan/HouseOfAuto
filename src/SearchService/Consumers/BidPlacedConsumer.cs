﻿using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Model;

namespace SearchService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("=> Consuming BidPlaced");

        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (auction.CurrentHighBid == null || context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }
}
