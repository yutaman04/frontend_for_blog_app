'use client'
import { SITE_TITLE } from '@/config/constantText'
import { AppBar, Box, Grid, Typography, useScrollTrigger } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

interface Props {}

export default function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const [titleFontsize, setTitleFontSize] = useState(60)
  const [menuFontSize, setMenuFontSize] = useState(20)
  const trigger = useScrollTrigger()

  useEffect(() => {
    setIsMounted(true)
    if (isMobile) {
      setTitleFontSize(16)
      setMenuFontSize(12)
    }
  }, [])

  if (!isMounted) return null
  return (
    <>
      <AppBar component="header">
        <Box className="relative">
          {!trigger && (
            <>
              <Image
                src={'/images/header_hero.jpg'}
                alt={''}
                width={2000}
                height={50}
                style={{ height: isMobile ? 50 : 200 }}
              />
              <Typography
                className="absolute inset-0 flex items-center justify-center font-extrabold"
                style={{ fontSize: titleFontsize }}
              >
                {SITE_TITLE}
              </Typography>
            </>
          )}

          <Grid
            container
            spacing={0.5}
            className="absolute  flex items-center justify-center font-extrabold text-center bg-sky-500 h-10"
          >
            <Grid item xs={4} style={{ fontSize: menuFontSize }}>
              <a>記事一覧</a>
            </Grid>
            <Grid item xs={4} style={{ fontSize: menuFontSize }}>
              <a>自己紹介</a>
            </Grid>
            <Grid item xs={4} style={{ fontSize: menuFontSize }}>
              <a>プライバシーポリシー</a>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    </>
  )
}
