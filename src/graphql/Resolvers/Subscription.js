const newTicket = {
  /**
   * event return listen
   * when user create ticket
   * @param {*} parent 
   * @param {*} args 
   * @param {*} ctx 
   */
  subscribe(parent, args, ctx) {
    return ctx.pubsub.asyncIterator(`ticketUser-${args.userId}`);
  }
};

export default {
  Subscription: {
    newTicket
  }
};
