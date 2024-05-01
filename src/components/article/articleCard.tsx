'use client'
import { Article } from '@/config/interfaces'
import { ARTICLE_CARD_CONTENT_LIMIT } from '@/config/setting'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client'
import { Box, Button, Card, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { markAsUntransferable } from 'worker_threads'
import { isMobile } from 'react-device-detect'
import { CategoryLabel } from './categoryLabel'

interface Props {
  article: Article
}

type responsiveConfig = {
  cardWidth: number
  cardHeight: number
  cardMargin: number
  immageWidth: number
}

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const limitedContent = () => {
    if (article.content.length > ARTICLE_CARD_CONTENT_LIMIT) {
      return article.content.substring(0, ARTICLE_CARD_CONTENT_LIMIT) + '...'
    }
    return article.content
  }

  const showUpdateCreateDate = () => {
    const createDate = new Date(article.createdAt)
    const updateDate = new Date(article.updatedAt)
    const strCreatedAt =
      createDate.getFullYear() +
      '/' +
      createDate.getMonth() +
      '/' +
      createDate.getDate()
    const strUpdatedAt =
      updateDate.getFullYear() +
      '/' +
      updateDate.getMonth() +
      '/' +
      updateDate.getDate()

    return '更新:' + strUpdatedAt + ',' + '作成:' + strCreatedAt
  }

  const articleTopImagePath =
    article.articleImages.length > 0 &&
    process.env.NEXT_PUBLIC_BACKEND_PUBLIC_PATH
      ? process.env.NEXT_PUBLIC_BACKEND_PUBLIC_PATH +
        article.id +
        '/' +
        article.articleImages[0].imageName
      : process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <Card
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        width: isMobile ? '90vw' : 300,
        height: isMobile ? '25vh' : '52vh',
      }}
    >
      <Grid container className="flex">
        <Grid className=" items-center" item xs={12}>
          <Card className=" items-center" style={{ margin: 10 }}>
            <img
              className=" items-center"
              src={articleTopImagePath}
              style={{ width: 'auto', height: '200px', objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid className=" items-center" item xs={12}>
          <Box m={2} width={'90%'}>
            <CategoryLabel
              categoryId={article.categoryId}
              categoryName={article.categoryName}
            />
            <Typography
              className=" text-xs"
              style={{
                color: 'gray',
                textAlign: 'right',
                marginRight: 10,
                marginTop: 5,
                fontSize: 12,
              }}
            >
              {showUpdateCreateDate()}
            </Typography>
            <p className=" text-2xl">{article.title}</p>
            <Typography style={{ overflowWrap: 'break-word' }}>
              {limitedContent()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
