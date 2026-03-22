'use client'
import { Typography } from '@mui/material'
import React from 'react'

interface Props {}
export const ShowFetchError: React.FC<Props> = ({}) => {
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
        <h2>サーバーエラー</h2>
        <Typography>
          API呼び出しに失敗しました。
          <br />
          しばらく経ってから再度リロードしてください。
        </Typography>
      </div>
    </div>
  )
}
