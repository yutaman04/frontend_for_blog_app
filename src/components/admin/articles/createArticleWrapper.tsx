/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
/* eslint-disable no-empty-pattern */
import React, { useCallback, useEffect, useState } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid, Input, Typography } from "@mui/material"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import "easymde/dist/easymde.min.css"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { CreateArticleSubmit } from "./parts/createArticleSubmit"
import dynamic from "next/dynamic"
import { SelectArticleCategory } from "./parts/selectArticleCategory"

// クライアント側でレンダリングする必要があるため動的読み込みをする
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

export const CreateArticleWrapper: React.FC = ({}) => {
  const [articleData, setArticleData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [articleImageList, setArticleImageList] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  let simpleMde: EasyMDE
  const getInstance = (instance: EasyMDE) => {
    simpleMde = instance
  }

  // 記事本文更新
  const onArticleDataChange = useCallback((value: string) => {
    setArticleData(value)
  }, [])

  const myJwt = useRecoilValue(myJwtState)
  const ADMIN_ARTICLE_IMAGE_UPLOAD = gql`
    mutation articleImageUpload($jwt: String!, $file: Upload!) {
      articleImageUpload(jwt: $jwt, file: $file) {
        filePath
        status
      }
    }
  `
  const [uploadImage, { data, loading, error }] = useMutation(
    ADMIN_ARTICLE_IMAGE_UPLOAD
  )

  const handlePaste = (data: any, e: any) => {
    if (
      e.clipboardData.files === undefined ||
      e.clipboardData.files.length === 0
    ) {
      return
    }

    const files = e.clipboardData.files
    const file = files[0]

    if (file.type === "image/png" && myJwt) {
      const upload = []
      upload.push(file)
      uploadImage({ variables: { jwt: myJwt, file: upload } })
    }
  }

  // 画像アップロード成功時
  useEffect(() => {
    if (data) {
      ;`![image](${data.articleImageUpload.filePath})`
      simpleMde.codemirror.replaceSelection(
        "![](" + data.articleImageUpload.filePath + ")"
      )
      setArticleImageList([
        ...articleImageList,
        data.articleImageUpload.filePath as string,
      ])
    }
  }, [data])

  return (
    <>
      <Typography className=" text-4xl font-bold">記事追加</Typography>
      <div className=" flex justify-center items-center">
        <div className=" w-screen">
          タイトル
          <Input
            className=" w-6/12 bg-white ml-5 border-l-stone-900"
            value={articleTitle}
            onChange={(e) => {
              setArticleTitle(e.target.value)
            }}
          />
          <SelectArticleCategory onChange={setSelectedCategory} />
          <CreateArticleSubmit
            articleImages={articleImageList}
            articleTitle={articleTitle}
            articleBody={articleData}
            articlaCategoryId={selectedCategory}
          />
        </div>
      </div>
      <div className=" mt-5 w-11/12">
        <SimpleMDE
          id="simple-mde"
          getMdeInstance={getInstance}
          onChange={onArticleDataChange}
          events={{ paste: handlePaste }}
          value={articleData}
        />
      </div>
    </>
  )
}
