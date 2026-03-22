'use client'
import { LinearProgress } from '@mui/material'
import React from 'react'

interface Props {}
export const ArticleLoading: React.FC<Props> = ({}) => {
  return (
    <div
      className="LoadMain"
      style={{
        width: '90vw',
        maxWidth: 300,
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
    >
      <div className="progressBarContainer">
        <h2>Now Loading・・・</h2>
        <LinearProgress variant="indeterminate" />
      </div>
    </div>
  )
}
