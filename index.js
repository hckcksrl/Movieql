import { GraphQLServer } from "graphql-yoga";
import resolvers from "./movieql/resolvers"

const server = new GraphQLServer({
    typeDefs : 'movieql/schema.graphql',
    resolvers
})


server.start(() => console.log("Movieql server running"));