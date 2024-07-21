/* eslint-disable react/react-in-jsx-scope */
import { ArticleWrapper } from "@/components/admin/articles/articlesWrapper"
import { Box } from "@mui/material"

export default function Home() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <Box>
        <ArticleWrapper />
      </Box>
    </main>
  )
}
