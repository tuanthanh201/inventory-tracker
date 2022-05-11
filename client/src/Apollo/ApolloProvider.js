import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import _ from 'lodash'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          findAllItems: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming) {
              let items
              if (existing?.items) {
                items = [...existing?.items, ...incoming.items]
              } else {
                items = [...incoming.items]
              }
              return {
                ...incoming,
                items,
              }
            },
          },
          findItemsByName: {
            keyArgs: false,
            merge(existing, incoming) {
              let items
              if (existing?.items) {
                items = [...existing?.items, ...incoming.items]
              } else {
                items = [...incoming.items]
              }
              return {
                ...incoming,
                items,
              }
            },
          },
          findItemsByTag: {
            keyArgs: ['tag'],
            merge(existing, incoming) {
              let items
              if (existing?.items) {
                items = _.cloneDeep(existing.items)
              } else {
                items = []
              }
              const itemIds = existing?.items.map((item) => item.__ref)
              const itemsSet = new Set(itemIds)
              for (const item of incoming.items) {
                if (!itemsSet.has(item.__ref)) {
                  items.push(item)
                }
              }
              return {
                ...incoming,
                items,
              }
            },
          },
          findItemsByWarehouse: {
            keyArgs: ['warehouseId'],
            merge(existing, incoming) {
              let items
              if (existing?.items) {
                items = _.cloneDeep(existing.items)
              } else {
                items = []
              }
              const itemIds = existing?.items.map((item) => item.__ref)
              const itemsSet = new Set(itemIds)
              for (const item of incoming.items) {
                if (!itemsSet.has(item.__ref)) {
                  items.push(item)
                }
              }
              return {
                ...incoming,
                items,
              }
            },
          },
        },
      },
    },
  }),
  link: httpLink,
})

const CustomApolloProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default CustomApolloProvider
