/* eslint-disable react/react-in-jsx-scope */
import { CreateArticleWrapper } from "@/components/organisms/createArticleWrapper"

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
