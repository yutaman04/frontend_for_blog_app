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
import {
  ARTICLE_LIST_PAGE_COUNT,
  ARTICLE_LIST_PAGE_COUNT_MOBILE,
} from '@/config/setting'
import { Box, Grid } from '@mui/material'
import { ArticleLoading } from '../loading/articleLoading'
import { useSearchParams } from 'next/navigation'
import { ArticlePagenate } from './articlePagenate'
import { ShowFetchError } from '../error/showFetchError'

interface Props {}

export const Articles: React.FC<Props> = ({}) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost/api/graphql',
    }),
  })

  const ArticleList = () => {
    const searchParams = useSearchParams()
    // 現在のページ
    const [page, setPage] = useState(Number(searchParams.get('page')))
    // 1ページ当たりの件数
    const perPage = isMobile
      ? ARTICLE_LIST_PAGE_COUNT_MOBILE
      : ARTICLE_LIST_PAGE_COUNT
    // 取得のオフセット
    const [currentOffset, setCurrentOffset] = useState(0)
    const [gridXs, setGridXs] = useState(6)

    const ARTICLES_QUERY = gql`
    query {
      articles(limit:${perPage}, offset:${currentOffset}) {
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
        totalCount
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

    useEffect(() => {
      refetch()
    }, [currentOffset])
    // ページまたはperPageの更新時
    useEffect(() => {
      if (page === 0) {
        setPage(1)
        setCurrentOffset(0)
      } else {
        setCurrentOffset(page * perPage - perPage)
      }
    }, [page])
    // 初期レンダリング時
    useEffect(() => {
      if (isMobile) {
        setGridXs(12)
      }
    }, [])
    const { loading, error, data, refetch } = useQuery(ARTICLES_QUERY)
    useEffect(() => {
      if (data && data.articles.length > 0) {
      }
    }, [data])

    if (loading) return <ArticleLoading />
    if (error) return <ShowFetchError />

    return (
      <div style={{ marginTop: isMobile ? 100 : 250 }}>
        <p className=" text-3xl">記事一覧</p>
        {data && data.articles.length > 0 ? (
          <>
            <ArticlePagenate
              page={page}
              perPage={perPage}
              totalCount={data.articles[0].totalCount}
            />
            <Box
              className=" items-center"
              style={{
                margin: 10,
              }}
            >
              <Grid
                container
                className=" items-center flex"
                style={{
                  width: isMobile ? '80vw' : '650px',
                  minWidth: isMobile ? '100px' : '650px',
                }}
              >
                {data ? (
                  <>
                    {data.articles.map((article: Article) => (
                      <Grid
                        item
                        className=" items-center"
                        key={article.id}
                        xs={gridXs}
                      >
                        <ArticleCard article={article} />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <>Not Found</>
                )}
              </Grid>
            </Box>
            <ArticlePagenate
              page={page}
              perPage={perPage}
              totalCount={data.articles[0].totalCount}
            />
          </>
        ) : (
          <></>
        )}
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
