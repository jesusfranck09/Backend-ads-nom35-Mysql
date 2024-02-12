require('dotenv').config()
require('./database');
const { createYoga,createSchema } = require('graphql-yoga');
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require('./resolvers');
const express = require('express')
const path = require ('path')
const {createServer } = require( 'node:http')


const app = express();

app.use(express.static(path.join(__dirname,'public')));


const yoga = createYoga({
  schema: createSchema({
    encodeURI:'/graphql',
    typeDefs: typeDefs,
    resolvers:resolvers
  })
})

const server = createServer(yoga)

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(
    `Server started, listening on port ${PORT} for incoming requests.`,
  ),
);


