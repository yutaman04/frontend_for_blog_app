"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import { Button } from "@mui/material"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { useRouter } from "next/navigation"
import { DeleteArticleButton } from "@/components/molecules/deleteArticleButton"

type props = {
  articleId: number
  articleTitle: string
  articleBody: string
  articleImages: string[]
  articlaCategoryId: string
  onSuccess?: () => void
}

export const EditArticleSubmit: React.FC<props> = ({
  articleId,
  articleTitle,
  articleBody,
  articleImages,
  articlaCategoryId,
  onSuccess,
}) => {
  const router = useRouter()
  const myJwt = useRecoilValue(myJwtState)

  const EDIT_ARTICLE_QUERY = gql`
    mutation editArticle(
      $articleId: Int!
      $articleBody: String!
      $articleTitle: String!
      $categoryId: Int!
      $articleImages: [String!]!
      $jwt: String!
    ) {
      editArticle(
        articleId: $articleId
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
  const [editArticle] =
    useMutation(EDIT_ARTICLE_QUERY)

  const [validMsg, setValidMsg] = useState<string[]>([])

  const articleValidation = () => {
    const tmpMsg = []
    if (!articleTitle || articleTitle === "") {
      tmpMsg.push("記事タイトルは必須項目です")
    }
    if (!articleBody || articleBody === "") {
      tmpMsg.push("記事本文は必須項目です")
    }
    if (!articlaCategoryId || articlaCategoryId === "") {
      tmpMsg.push("記事カテゴリーは必須項目です")
    }

    setValidMsg(tmpMsg)
    return tmpMsg.length === 0
  }

  const handleEditArticle = () => {
    if (articleValidation()) {
      editArticle({
        variables: {
          jwt: myJwt,
          articleId: articleId,
          articleBody: articleBody,
          articleTitle: articleTitle,
          articleImages: articleImages,
          categoryId: parseInt(articlaCategoryId),
        },
      }).then(() => {
        setValidMsg([])
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/articles")
        }
      })
    }
  }

  return (
    <>
      <Button
        onClick={handleEditArticle}
        style={{ backgroundColor: "#3b82f6", color: "#ffffff", marginLeft: 8 }}
        variant="contained"
      >
        更新
      </Button>
      <DeleteArticleButton articleId={articleId} onSuccess={onSuccess} />
      {validMsg.length > 0 && (
        <ul className=" ml-5 text-red-600 text-lg font-bold">
          {validMsg.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </>
  )
}
