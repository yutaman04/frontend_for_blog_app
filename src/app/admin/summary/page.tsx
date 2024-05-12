import { AdminAuthWrapper } from '@/components/admin/adminAuthWrapper'
import { ApolloProviderClientWrapper } from '@/components/graphql/apolloProviderClientWrapper'

export default function Home() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <ApolloProviderClientWrapper>
        <AdminAuthWrapper>
          <h1 className=" text-4xl font-extrabold">管理サマリー</h1>
        </AdminAuthWrapper>
      </ApolloProviderClientWrapper>
    </main>
  )
}
