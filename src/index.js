import { GraphQLServer, PubSub } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import "babel-polyfill";
import { resolvers, types as typeDefs } from "./graphql";

dotenv.config();

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    };
  }
});

server.start(({ port }) => {
  console.log(`Server running on http://localhost${port}`);
});
