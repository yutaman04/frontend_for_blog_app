/* eslint-disable react/react-in-jsx-scope */
import { CategoriesWrapper } from "@/components/organisms/categoriesWrapper"
import { Box } from "@mui/material"

export default function CategoriesPage() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <Box p={3}>
        <CategoriesWrapper />
      </Box>
    </main>
  )
}
