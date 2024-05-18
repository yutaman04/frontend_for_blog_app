'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Box, Card, Grid } from '@mui/material'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { useRouter } from 'next/navigation'

type summaryCountContent = {
  itemName: string
  count: number
}
export const SummaryCountItem: React.FC<summaryCountContent> = ({
  itemName,
  count,
}) => {
  return (
    <>
      <Card className=" m-4 p-4 border-2 border-sky-600">
        <Grid
          container
          className=" flex justify-center items-center text-center"
        >
          <Grid item xs={12} className=" text-2xl font-bold">
            {itemName}
          </Grid>
          <Grid item xs={12} className=" text-7xl">
            {count}
            <span className=" text-xl">記事</span>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
