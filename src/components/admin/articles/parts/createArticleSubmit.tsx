"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react"
import { Button, Grid, Input, Typography } from "@mui/material"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import "easymde/dist/easymde.min.css"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { useRouter } from "next/navigation"

type props = {
  articleTitle: string
  articleBody: string
  articleImages: string[]
  articlaCategoryId: string
}

export const CreateArticleSubmit: React.FC<props> = ({
  articleTitle,
  articleBody,
  articleImages,
  articlaCategoryId,
}) => {
  const router = useRouter()
  const myJwt = useRecoilValue(myJwtState)

  const CREATE_ARTICLE_QUERY = gql`
    mutation createArticle(
      $articleBody: String!
      $articleTitle: String!
      $categoryId: Int!
      $articleImages: [String!]!
      $jwt: String!
    ) {
      createArticle(
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
  const [createArticle, { data, loading, error }] =
    useMutation(CREATE_ARTICLE_QUERY)

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

  const handleCreateArticle = () => {
    if (articleValidation()) {
      createArticle({
        variables: {
          jwt: myJwt,
          articleBody: articleBody,
          articleTitle: articleTitle,
          articleImages: articleImages,
          categoryId: parseInt(articlaCategoryId),
        },
      }).then((data) => {
        setValidMsg([])
        router.push("/admin/articles")
      })
    }
  }

  return (
    <>
      <Button
        className=" bg-lime-500 ml-5 text-orange-900 font-bold hover:bg-orange-950"
        onClick={handleCreateArticle}
      >
        記事を投稿する
      </Button>
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
