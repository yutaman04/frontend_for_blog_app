'use client'
import { SITE_TITLE } from '@/config/constantText'
import { AppBar, Box, Grid, Typography, useScrollTrigger } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

interface Props {}

export default function Footer() {
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
    <footer className=" w-full bg-slate-500 min-h-15 mt-5">
      <Box className="h-max mx-auto max-w-screen-xl pt-2 pb-2 items-center justify-center">
        <span className=" flex h-max items-center justify-center dark:text-slate-200">
          © 2024{'　'}
          <a href="#" className="hover:underline">
            {SITE_TITLE}
          </a>
          . All Rights Reserved.
        </span>
      </Box>
    </footer>
  )
}
