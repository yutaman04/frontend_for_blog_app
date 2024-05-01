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
import { Box, Button, Grid } from '@mui/material'
import Link from 'next/link'

interface Props {
  categoryId: number
  categoryName: string
}

export const CategoryLabel: React.FC<Props> = ({
  categoryId,
  categoryName,
}) => {
  return (
    <Link className=" bg-orange-300 p-1 rounded-sm tracking-wide" href={'#'}>
      {categoryName}
    </Link>
  )
}
