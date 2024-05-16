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
      <Card className=" m-4 p-4">
        <Grid container>
          <Grid item xs={3}>
            {itemName}
          </Grid>
          <Grid item xs={9}>
            {count}
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
