const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./graphql')
const store = require('./repositories')

const ItemService = require('./services/ItemService')
const TagService = require('./services/TagService')
const WarehouseService = require('./services/WarehouseService')

const WarehouseLoader = require('./graphql/loaders/WarehouseLoader')

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
      warehouseLoader: WarehouseLoader(dataSources().warehouseService),
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

  if (process.env.ENV === 'PRODUCTION') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
      )
    })
  }

  return app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`Server is up on port ${process.env.SERVER_PORT}`)
  })
}

module.exports = setupApolloServer
