import bcrypt from "bcrypt";
import { generateToken, roleInformation, isAdmin } from "../../utils";

/**
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 */
async function signIn(parent, args, ctx) {
  const { prisma } = ctx;
  const { password } = args;

  const user = await prisma.user.findMany({
    where: {
      mail: args.mail
    }
  });

  const dataUser = user[0];

  if (!dataUser) {
       throw new Error("Invalid Credentials");
  }

  const isValidPass = await bcrypt.compare(password, dataUser.password);

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
  const { prisma } = ctx;
  const { data } = args;

  const salt = await bcrypt.genSalt(10);

  data.password = await bcrypt.hash(data.password, salt);

  try {
    const created = await prisma.user.create({
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
  const { request, prisma, pubsub } = ctx;
  const { userId } = args;

  if (!isAdmin(request)) {
    throw new Error("Unautorized");
  }

  const createdTicket = await prisma.ticket
    .create({
      data: {
        ticket_pedido: "",
        user: {
          connect: { id: Number(userId) }
        }
      }
    })
    .user();

  pubsub.publish(`ticketUser-${userId}`, {
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
  const { prisma } = ctx;
  const { ticketId, ticket_pedido } = args;


  return prisma.ticket.update({
    where: {
      id: Number(ticketId)
    },
    data: {
      ticket_pedido
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
