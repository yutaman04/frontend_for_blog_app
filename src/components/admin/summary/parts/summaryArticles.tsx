'use client'
import React from 'react'
import { Box, Card, Grid } from '@mui/material'
import { ArticleCard } from '@/components/article/articleCard'
import { Article } from '@/config/interfaces'

type summaryCountContent = {
  recentPostsArticle: Article[]
}
export const SummaryArticles: React.FC<summaryCountContent> = ({
  recentPostsArticle,
}) => {
  return (
    <Box>
      {recentPostsArticle && (
        <>
          <Grid container>
            {recentPostsArticle.map((article, index) => {
              return (
                <Grid item key={index} className=" m-2">
                  <ArticleCard article={article}></ArticleCard>
                </Grid>
              )
            })}
          </Grid>
        </>
      )}
    </Box>
  )
}
