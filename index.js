require('dotenv').config()
require('./database');
const { GraphQLServer } = require('graphql-yoga');
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require('./resolvers');
const express = require('express')
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

const options = {
    port: 8000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
    cors: {
      credentials: true,
      origin: ["http://localhost:3000"] // your frontend url.
    }
};

const server = new GraphQLServer({
  schema,
  context: req => ({...req})
});

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
);