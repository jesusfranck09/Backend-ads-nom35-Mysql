require('dotenv').config()
require('./database');

const express = require('express')
const cors  = require('cors')
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require('./resolvers');
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});


const PORT = 8000

const app = express()
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)

app.use(cors())

console.log(`Server listening on http://localhost:${PORT} ...`)
