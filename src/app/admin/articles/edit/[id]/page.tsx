/* eslint-disable react/react-in-jsx-scope */
import { EditArticleWrapper } from "@/components/organisms/editArticleWrapper"

type Props = {
  params: { id: string }
}

export default function EditArticlePage({ params }: Props) {
  return (
    <main
      className="min-h-screen flex-col"
      style={{ marginLeft: 250, marginTop: 50 }}
    >
      <EditArticleWrapper articleId={Number(params.id)} />
    </main>
  )
}
