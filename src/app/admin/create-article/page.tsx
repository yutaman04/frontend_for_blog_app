/* eslint-disable react/react-in-jsx-scope */
import { CreateArticleWrapper } from "@/components/admin/articles/createArticleWrapper"

export default function Home() {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <CreateArticleWrapper />
    </main>
  )
}
