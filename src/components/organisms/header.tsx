'use client'
import { SITE_TITLE } from '@/config/constantText'
import { AppBar, Box, Typography, useScrollTrigger } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { ApolloProviderClientWrapper } from '@/components/providers/apolloProviderClientWrapper'

const FIXED_ARTICLES_QUERY = gql`
  query {
    articles(limit: 10, offset: 0, articleType: FIXED) {
      id
      title
    }
  }
`

const FixedArticleNavLinks: React.FC<{ fontSize: number }> = ({ fontSize }) => {
  const { data } = useQuery(FIXED_ARTICLES_QUERY)
  return (
    <>
      {data?.articles?.map((article: { id: string; title: string }) => (
        <Link
          key={article.id}
          href={`/articles/${article.id}`}
          style={{ color: 'inherit', textDecoration: 'none', fontSize, whiteSpace: 'nowrap' }}
        >
          {article.title}
        </Link>
      ))}
    </>
  )
}

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

          <Box
            className="absolute flex items-center justify-center font-extrabold bg-sky-500 h-10"
            style={{ width: '100%', gap: isMobile ? 12 : 32 }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', fontSize: menuFontSize, whiteSpace: 'nowrap' }}>
              記事一覧
            </Link>
            <ApolloProviderClientWrapper>
              <FixedArticleNavLinks fontSize={menuFontSize} />
            </ApolloProviderClientWrapper>
          </Box>
        </Box>
      </AppBar>
    </>
  )
}
