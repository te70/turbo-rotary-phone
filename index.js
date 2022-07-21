const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});
 
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });

