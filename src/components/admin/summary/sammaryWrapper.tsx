'use client'
import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { AdminSummary } from '@/config/interfaces'
import { gql, useQuery } from '@apollo/client'
import { myJwtState } from '@/state/jwtState'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ArticleLoading } from '@/components/loading/articleLoading'
import { SummaryCountItem } from './parts/summaryCountItem'

export const SummaryWrapper: React.FC = ({}) => {
  const { authInfoHasDecision, getAutuInfo } = useAuthInfo()
  const myJwt = useRecoilValue(myJwtState)
  const ADMIN_SUMMARY_QUERY = gql`
    query {
      adminSummary(jwt: "${myJwt}") {
        activeArticleCount
        disabledArticleCount
        totalArticleCount
        recentPostsArticle {
          categoryId
          content
          createUserDisplayName
          createdAt
          id
          isActive
          title
          updatedAt
          categoryName
          createUserName
        }
      }
    }
  `
  const { loading, error, data, refetch } = useQuery(ADMIN_SUMMARY_QUERY)

  useEffect(() => {
    refetch()
  }, [myJwt])

  return (
    <>
      {loading ? (
        <div className=" flex justify-center items-center">
          <ArticleLoading />
        </div>
      ) : (
        <Grid container>
          {data ? (
            <>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={'総記事数'}
                  count={data.adminSummary.totalArticleCount}
                />
              </Grid>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={'非公開記事数'}
                  count={data.adminSummary.disabledArticleCount}
                />
              </Grid>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={'公開記事数'}
                  count={data.adminSummary.activeArticleCount}
                />
              </Grid>
            </>
          ) : (
            <>Not Found</>
          )}
        </Grid>
      )}
    </>
  )
}
