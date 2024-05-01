'use client'
import { Article } from '@/config/interfaces'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client'
import { ArticleCard } from './articleCard'
import { isMobile } from 'react-device-detect'
import React, { useEffect, useState } from 'react'
import { ARTICLE_LIST_PAGE_COUNT } from '@/config/setting'
import { Box, Grid } from '@mui/material'

interface Props {}

export const Articles: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(ARTICLE_LIST_PAGE_COUNT)
  const [currentOffset, setCurrentOOffset] = useState(0)
  const [gridXs, setGridXs] = useState(6)
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost/api/graphql',
    }),
  })
  useEffect(() => {
    if (isMobile) {
      setGridXs(12)
    }
  }, [])

  const ARTICLES_QUERY = gql`
    query {
      articles(limit:${currentLimit}, offset:${currentOffset}) {
        id
        title
        categoryId
        categoryName
        content
        createUserDisplayName
        createUserId
        createUserName
        createdAt
        isActive
        updatedAt
        articleImages {
          articleId
          imageName
          id
          isActive
          sortOrder
        }
      }
    }
  `
  const ArticleList = () => {
    const { loading, error, data } = useQuery(ARTICLES_QUERY)

    if (loading) return <p>...loading</p>
    if (error) return <p>{error.message}</p>

    return (
      <div style={{ marginTop: isMobile ? 0 : 150 }}>
        <p className=" text-3xl">記事一覧</p>
        <Box
          style={{
            margin: 10,
          }}
        >
          <Grid
            container
            className=" items-center flex"
            style={{ width: isMobile ? '90vw' : '50vw' }}
          >
            {data.articles.map((article: Article) => (
              <Grid item className=" items-center" key={article.id} xs={gridXs}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    )
  }

  return (
    <>
      <ApolloProvider client={client}>
        <ArticleList />
      </ApolloProvider>
    </>
  )
}
