using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        public BidPlacedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;

        }
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("=>> Bid Placed message received");

            await _hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
        }
    }
}