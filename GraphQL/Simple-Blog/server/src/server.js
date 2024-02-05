import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

import { typeDefs } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js'

config();


const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    })

    const app = express();
    await server.start();

    server.applyMiddleware({ app })

    app.use(cors());

    app.get('/', (req, res) => {
        res.json({
            status: true,
            message: "Welcome to my Simple Blog Application"
        })
    })

    app.listen(3000, () => {
        console.log("Server started on localhost:3000");
        console.log(server.graphqlPath);
    })
}

startServer();