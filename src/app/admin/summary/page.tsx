import { SummaryWrapper } from '@/components/organisms/summaryWrapper'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <Box>
        <SummaryWrapper />
      </Box>
    </main>
  )
}
