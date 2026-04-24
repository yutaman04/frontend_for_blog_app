import { ArticleDetail } from "@/components/organisms/articleDetail"
import Header from "@/components/organisms/header"
import Footer from "@/components/organisms/footer"

interface Props {
  params: { id: string }
}

export default function ArticleDetailPage({ params }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div style={{ marginTop: 250, width: "100%" }}>
        <ArticleDetail articleId={Number(params.id)} />
      </div>
      <Footer />
    </main>
  )
}
