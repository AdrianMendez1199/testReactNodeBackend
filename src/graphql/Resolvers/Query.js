import { isAdmin, whoAmi } from "../../utils";

/**
 * return one or many users
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
function getUser(parent, args, ctx) {
  const { prisma, request } = ctx;

  if (!isAdmin(request)){
    throw new Error("Unautorize");
  }

  if (!args.id) {
    return prisma.user.findMany();
  }

  return prisma.user.findMany({
    where: { id: Number(args.id) }
  });
}

/**
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
function currentUserIsAdmin(parent, args, ctx) {
  return isAdmin(ctx.request);
}

/**
 * return tickets, if
 * user is admin return all tickets
 * if is not admin return your tickets
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
async function getTickets(parent, args, ctx) {

  if (!isAdmin(ctx.request)) {
    const data = whoAmi(ctx.request);

    return ctx.prisma.raw`SELECT 
    nombre, ticket.id, mail, ticket_pedido
    FROM user
    INNER JOIN ticket ON user.id = ticket.id_user
    WHERE user.id = ${Number(data.genToken.data.id)}`;
  }

  const userTikect = await ctx.prisma.raw`SELECT 
    nombre, ticket.id, mail, ticket_pedido
    FROM user
    INNER JOIN ticket ON user.id = ticket.id_user`;

  return userTikect;
}

export default {
  Query: {
    getUser,
    currentUserIsAdmin,
    getTickets
  }
};
