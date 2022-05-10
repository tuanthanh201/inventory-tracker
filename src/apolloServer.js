const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./graphql')
const store = require('./repositories')

const ItemService = require('./services/ItemService')
const TagService = require('./services/TagService')
const WarehouseService = require('./services/WarehouseService')

const dataSources = () => ({
  itemService: new ItemService({ store }),
  tagService: new TagService({ store }),
  warehouseService: new WarehouseService({ store }),
})

const setupApolloServer = async () => {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      credentials: true,
      origin: process.env.FRONT_END_URL,
    },
    bodyParserConfig: {
      limit: '50mb',
    },
  })

  return app.listen({ port: process.env.PORT }, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
  })
}

module.exports = setupApolloServer
