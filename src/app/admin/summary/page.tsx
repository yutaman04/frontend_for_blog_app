import { AdminAuthWrapper } from '@/components/admin/adminAuthWrapper'
import { SummaryWrapper } from '@/components/admin/summary/sammaryWrapper'
import { ApolloProviderClientWrapper } from '@/components/graphql/apolloProviderClientWrapper'
import AdminSideMenuAndHeader from '@/components/sideMenu/adminSideMenuAndHeader'
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
