import { Articles } from '@/components/article/articles'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Articles />
      <Footer />
    </main>
  )
}
