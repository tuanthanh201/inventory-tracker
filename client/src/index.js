import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ApolloProvider from './Apollo/ApolloProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider>
    <App />
  </ApolloProvider>
)
