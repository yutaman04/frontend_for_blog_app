"use client"
import React, { useState } from "react"
import { Button } from "@mui/material"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { useRouter } from "next/navigation"

type Props = {
  articleTitle: string
  articleBody: string
  articleImages: string[]
  articlaCategoryId: string
  onSuccess?: () => void
}

export const CreateFixedArticleSubmit: React.FC<Props> = ({
  articleTitle,
  articleBody,
  articleImages,
  articlaCategoryId,
  onSuccess,
}) => {
  const router = useRouter()
  const myJwt = useRecoilValue(myJwtState)

  const CREATE_FIXED_ARTICLE_MUTATION = gql`
    mutation createFixedArticle(
      $articleBody: String!
      $articleTitle: String!
      $categoryId: Int!
      $articleImages: [String!]!
      $jwt: String!
    ) {
      createFixedArticle(
        articleBody: $articleBody
        articleTitle: $articleTitle
        categoryId: $categoryId
        articleImages: $articleImages
        jwt: $jwt
      ) {
        articleId
        status
      }
    }
  `
  const [createFixedArticle] = useMutation(CREATE_FIXED_ARTICLE_MUTATION)
  const [validMsg, setValidMsg] = useState<string[]>([])

  const validate = () => {
    const msgs: string[] = []
    if (!articleTitle) msgs.push("記事タイトルは必須項目です")
    if (!articleBody) msgs.push("記事本文は必須項目です")
    if (!articlaCategoryId) msgs.push("記事カテゴリーは必須項目です")
    setValidMsg(msgs)
    return msgs.length === 0
  }

  const handleCreate = () => {
    if (validate()) {
      createFixedArticle({
        variables: {
          jwt: myJwt,
          articleBody,
          articleTitle,
          articleImages,
          categoryId: parseInt(articlaCategoryId),
        },
      }).then(() => {
        setValidMsg([])
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/fixed-articles")
        }
      })
    }
  }

  return (
    <>
      <Button
        className="bg-lime-500 ml-5 text-orange-900 font-bold hover:bg-orange-950"
        onClick={handleCreate}
      >
        固定記事を投稿する
      </Button>
      {validMsg.length > 0 && (
        <ul className="ml-5 text-red-600 text-lg font-bold">
          {validMsg.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </>
  )
}
