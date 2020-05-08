import bcrypt from "bcrypt";
import { generateToken, roleInformation, isAdmin } from "../../utils";

/**
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
async function signIn(parent, args, ctx) {
  const user = await ctx.prisma.user.findMany({
    where: {
      mail: args.mail
    }
  });

  const dataUser = user[0];

  if (!dataUser) {
       throw new Error("Invalid Credentials");
  }

  const isValidPass = await bcrypt.compare(args.password, dataUser.password);

  if (!isValidPass) {
    throw new Error("Invalid Credentials");
  }

  const role = await roleInformation(dataUser.id, ctx);

  delete dataUser.password;

  const token = generateToken(dataUser, role);

  dataUser.role = role.nombre;

  return {
    token,
    user: dataUser
  };
}

/**
 * create user
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
async function singUp(parent, args, ctx) {
  const { data } = args;

  const salt = await bcrypt.genSalt(10);

  data.password = await bcrypt.hash(data.password, salt);

  try {
    const created = await ctx.prisma.user.create({
      data: {
        ...data,
        tipo_usuario: {
          connect: { id: 1 }
        }
      }
    });

    return created;
  } catch (e) {
    if (e.code === "P2002"){
      throw Error("El Email ya esta registrado");
    }

    throw Error("Ocurrio un error");
  }
}

/**
 * this function assing ticket to user
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
async function assignTicket(parent, args, ctx) {

  if (!isAdmin(args.request)) {
    throw new Error("Unautorized");
  }

  const createdTicket = await ctx.prisma.ticket
    .create({
      data: {
        ticket_pedido: "",
        user: {
          connect: { id: Number(args.userId) }
        }
      }
    })
    .user();

  ctx.pubsub.publish(`ticketUser-${userId}`, {
    newTicket: {
      mutation: "CREATED",
      data: createdTicket
    }
  });

  return createdTicket;
}

/**
 * this function set tipo_ticket
 * in db
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
function setTypeTicket(parent, args, ctx) {

  return ctx.prisma.ticket.update({
      where: {
        id: Number(args.ticketId)
      },
      data: {
        ticket_pedido: args.ticket_pedido
      }
  });
}

export default {
  Mutation: {
    signIn,
    singUp,
    assignTicket,
    setTypeTicket
  }
};
