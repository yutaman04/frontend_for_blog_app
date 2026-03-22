import { Articles } from '@/components/organisms/articles'
import Footer from '@/components/organisms/footer'
import Header from '@/components/organisms/header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Articles />
      <Footer />
    </main>
  )
}
