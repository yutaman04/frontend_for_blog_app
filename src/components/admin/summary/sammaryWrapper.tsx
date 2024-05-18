'use client'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { AdminSummary } from '@/config/interfaces'
import { gql, useQuery } from '@apollo/client'
import { myJwtState } from '@/state/jwtState'
import { useRecoilValue } from 'recoil'
import { ArticleLoading } from '@/components/loading/articleLoading'
import { SummaryCountItem } from './parts/summaryCountItem'
import { SummaryArticles } from './parts/summaryArticles'
import { ADMIN_SUMMARY_LABELS } from '@/config/constantText'

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
          articleImages {
            articleId
            createUserDisplayName
            createUserId
            createUserName
            createdAt
            id
            imageName
            isActive
            sortOrder
            updatedAt
          }
        }
      }
    }
  `
  const { loading, error, data, refetch } = useQuery(ADMIN_SUMMARY_QUERY)
  const [summaryData, setSummaryData] = useState<AdminSummary | null>(null)

  useEffect(() => {
    if (data) {
      setSummaryData(data.adminSummary)
    }
  }, [data])

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
        <Grid container className=" pt-7">
          {summaryData ? (
            <>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={ADMIN_SUMMARY_LABELS.TOTAL_AOUNT}
                  count={summaryData.totalArticleCount}
                />
              </Grid>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={ADMIN_SUMMARY_LABELS.DISABLE_COUNT}
                  count={summaryData.disabledArticleCount}
                />
              </Grid>
              <Grid item xs={4}>
                <SummaryCountItem
                  itemName={ADMIN_SUMMARY_LABELS.ENABLE_COUNT}
                  count={summaryData.activeArticleCount}
                />
              </Grid>
              <Grid
                item
                xs={12}
                className=" text-center text-4xl border-b-2 mt-5 border-white"
              >
                {ADMIN_SUMMARY_LABELS.NEWER_ARTICLES}
              </Grid>
              <Grid item className=" flex justify-center items-center" xs={12}>
                <SummaryArticles
                  recentPostsArticle={summaryData.recentPostsArticle}
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
