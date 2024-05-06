'use client'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const ApolloProviderClientWrapper: React.FC<Props> = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost/api/graphql',
    }),
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
