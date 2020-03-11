require('dotenv').config()
require('./database');
const { GraphQLServer } = require('graphql-yoga');
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require('./resolvers');
const express = require('express')
const http = require ('http')
const path = require ('path')
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();

app.set('port',process.env.PORT || 8000)
app.use(express.static(path.join(__dirname,'public')))


const server = new GraphQLServer({
  schema,
  app,
  context: req => ({...req})
});

server.start(app.get('port'),()=>{
  console.log(`server on port ${app.get('port')}`)
})