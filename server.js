const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')
const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
const app = express();


server.applyMiddleware({ app });
// models.sequelize.authenticate();
// models.sequelize.sync();

app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
