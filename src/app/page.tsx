// import ArticleLists from '@/components/article/articleLists'
import { Articles } from '@/components/article/articles'
import Header from '@/components/header/header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Articles />
    </main>
  )
}
