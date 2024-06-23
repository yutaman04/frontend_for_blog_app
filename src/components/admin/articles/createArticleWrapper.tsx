/* eslint-disable no-empty-pattern */
"use client"
import React, { useCallback, useEffect, useState } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid, Input, Typography } from "@mui/material"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"

export const CreateArticleWrapper: React.FC = ({}) => {
  const [articleData, setArticleData] = useState("")

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadImage, { data, loading, error }] = useMutation(
    ADMIN_ARTICLE_IMAGE_UPLOAD
  )
  let simpleMde: EasyMDE
  const getInstance = (instance: EasyMDE) => {
    simpleMde = instance
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      const upload = Array()
      upload.push(file)
      uploadImage({ variables: { jwt: myJwt, file: upload } })
    }
  }

  // 画像アップロード成功時
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const addImageLink = `![image](${data.articleImageUpload.filePath})`
      simpleMde.codemirror.replaceSelection(
        "![](" + data.articleImageUpload.filePath + ")"
      )
    }
  }, [data])

  useEffect(() => {
    console.log("articleData", articleData)
  }, [articleData])
  return (
    <>
      <Typography className=" text-4xl font-bold">記事一覧</Typography>
      <div className=" flex justify-center items-center">
        <div className=" w-screen">
          タイトル
          <Input className=" w-9/12 bg-white ml-5 border-l-stone-900" />
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
