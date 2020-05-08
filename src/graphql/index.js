import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const typesArrays = fileLoader(path.join(__dirname, "./**/*.graphql"), {
  recursive: true
});

const resolversArray = fileLoader(path.join(__dirname, "./**/Resolvers/*.js"), {
  recursive: true
});

const resolvers = mergeResolvers(resolversArray);
const types = mergeTypes(typesArrays, { all: true });

export { resolvers, types };
