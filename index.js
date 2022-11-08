require('dotenv').config()
require('./database');
const { GraphQLServer } = require('graphql-yoga');
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require('./resolvers');
const express = require('express')
const path = require ('path')
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();

app.use(express.static(path.join(__dirname,'public')));
const options = {
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

const server = new GraphQLServer({
  schema,
  app,
  context: req => ({...req})
});

const PORT = process.env.PORT || 4000;

server.start(options, () =>
  console.log(
    `Server started, listening on port ${PORT} for incoming requests.`,
  ),
);
