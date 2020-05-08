const newTicket = {
  subscribe(parent, args, ctx) {
    return ctx.pubsub.asyncIterator(`ticketUser-${args.userId}`);
  }
};

export default {
  Subscription: {
    newTicket
  }
};
