/* eslint-disable react/react-in-jsx-scope */
import { FixedArticlesWrapper } from "@/components/organisms/fixedArticlesWrapper"
import { Box } from "@mui/material"

export default function FixedArticlesPage() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <Box>
        <FixedArticlesWrapper />
      </Box>
    </main>
  )
}
