import { CreateArticleWrapper } from '@/components/admin/articles/createArticleWrapper'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <Box>
        <CreateArticleWrapper />
      </Box>
    </main>
  )
}
