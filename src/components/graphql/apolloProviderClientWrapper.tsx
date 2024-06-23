"use client"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React from "react"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

interface Props {
  children: React.ReactNode
}

export const ApolloProviderClientWrapper: React.FC<Props> = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: "http://localhost/api/graphql",
    }),
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
