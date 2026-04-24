"use client"
import { Article } from "@/config/interfaces"
import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { ArticleLoading } from "@/components/atoms/articleLoading"
import { ShowFetchError } from "@/components/molecules/showFetchError"
import { CategoryLabel } from "@/components/atoms/categoryLabel"
import { ApolloProviderClientWrapper } from "@/components/providers/apolloProviderClientWrapper"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"

interface Props {
  articleId: number
}

const CopyButton: React.FC<{ text: string; position?: "block" | "inline" }> = ({ text, position = "block" }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (position === "inline") {
    return (
      <Tooltip title={copied ? "コピーしました" : "コピー"} placement="top">
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{ p: "1px", ml: "2px", verticalAlign: "middle", color: copied ? "#4ade80" : "#9ca3af" }}
        >
          {copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title={copied ? "コピーしました" : "コピー"} placement="top">
      <IconButton
        size="small"
        onClick={handleCopy}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: copied ? "#4ade80" : "#9ca3af",
          backgroundColor: "rgba(0,0,0,0.3)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      >
        {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}

const CodeBlock: React.FC<{ language: string; children: string }> = ({ language, children }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <CopyButton text={children} position="block" />}
      <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ borderRadius: 8 }}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

const InlineCode: React.FC<{ children: string }> = ({ children }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <code style={{ backgroundColor: "#374151", color: "#f9fafb", padding: "2px 6px", borderRadius: 4, fontSize: "0.875em" }}>
        {children}
      </code>
      {hovered && <CopyButton text={children} position="inline" />}
    </span>
  )
}

const ArticleDetailContent: React.FC<Props> = ({ articleId }) => {
  const [imgError, setImgError] = useState(false)

  const GET_ARTICLE = gql`
    query {
      article(id: ${articleId}) {
        id
        title
        categoryId
        categoryName
        content
        createUserDisplayName
        createdAt
        updatedAt
        articleImages {
          id
          imageName
          sortOrder
        }
      }
    }
  `

  const { loading, error, data } = useQuery(GET_ARTICLE)

  if (loading) return <ArticleLoading />
  if (error) return <ShowFetchError />

  const article: Article = data?.article
  if (!article) return <ShowFetchError />

  const topImagePath =
    !imgError &&
    article.articleImages &&
    article.articleImages.length > 0 &&
    process.env.NEXT_PUBLIC_BACKEND_PUBLIC_PATH
      ? article.articleImages[0].imageName
      : process.env.NEXT_PUBLIC_NO_IMAGE

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 4 }}>
      <img
        src={topImagePath}
        alt={article.title}
        style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 8 }}
        onError={() => setImgError(true)}
      />
      <Box mt={3}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CategoryLabel categoryId={article.categoryId} categoryName={article.categoryName} />
          <Typography variant="body2" sx={{ textAlign: "right", color: "#ffffff" }}>
            {`更新: ${formatDate(article.updatedAt)}`}<br />
            {`作成: ${formatDate(article.createdAt)}`}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" mt={1}>
          {article.title}
        </Typography>
      </Box>
      <Box mt={4} className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt }) => (
              <span style={{ display: "block", textAlign: "center" }}>
                <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
              </span>
            ),
            table: ({ children }) => (
              <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse" }}>{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th style={{ border: "1px solid #ccc", padding: "8px 12px", backgroundColor: "#6b7280", color: "#ffffff" }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{ border: "1px solid #ccc", padding: "8px 12px" }}>
                {children}
              </td>
            ),
            code: ({ className, children }) => {
              const language = className?.replace("language-", "") ?? "text"
              const isInline = !className && !String(children).includes("\n")
              const text = String(children).replace(/\n$/, "")
              if (isInline) {
                return <InlineCode>{text}</InlineCode>
              }
              return <CodeBlock language={language}>{text}</CodeBlock>
            },
          }}
        >
          {article.content.replace(/!\[([^\]]*)\]\(([^)]*)\)/, "")}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

export const ArticleDetail: React.FC<Props> = ({ articleId }) => {
  return (
    <ApolloProviderClientWrapper>
      <ArticleDetailContent articleId={articleId} />
    </ApolloProviderClientWrapper>
  )
}
