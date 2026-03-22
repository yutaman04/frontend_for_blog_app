'use client'
import React from 'react'
import {
  Box,
  Link as MuiLink,
  Pagination,
  PaginationItem,
  styled,
} from '@mui/material'
import { ARTICLE_LIST_PAGE_COUNT } from '@/config/setting'
import Link from 'next/link'

interface Props {
  page: number
  perPage: number
  totalCount: number
  customHref?: string
}

export const ArticlePagenate: React.FC<Props> = ({
  page,
  perPage,
  totalCount,
  customHref = '/',
}) => {
  const count = Math.floor(totalCount / perPage) + 1
  return (
    <>
      <Pagination
        className=" bg-gray-200 flex justify-center"
        page={page}
        count={count}
        renderItem={(item) => (
          <PaginationItem
            className=""
            component={MuiLink}
            href={item.page === 1 ? customHref : `?page=${item.page}`}
            {...item}
          />
        )}
      />
    </>
  )
}
