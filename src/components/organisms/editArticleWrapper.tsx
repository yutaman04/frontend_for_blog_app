/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useCallback, useEffect, useState } from "react"
import { Grid, Input, Typography } from "@mui/material"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import "easymde/dist/easymde.min.css"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import dynamic from "next/dynamic"
import { SelectArticleCategory } from "@/components/molecules/selectArticleCategory"
import { EditArticleSubmit } from "@/components/molecules/editArticleSubmit"
import { ArticleLoading } from "@/components/atoms/articleLoading"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

type Props = {
  articleId: number
}

export const EditArticleWrapper: React.FC<Props> = ({ articleId }) => {
  const [articleData, setArticleData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [articleImageList, setArticleImageList] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  let simpleMde: EasyMDE
  const getInstance = (instance: EasyMDE) => {
    simpleMde = instance
  }

  const onArticleDataChange = useCallback((value: string) => {
    setArticleData(value)
  }, [])

  const myJwt = useRecoilValue(myJwtState)

  const GET_ARTICLE = gql`
    query {
      article(id: ${articleId}) {
        id
        title
        categoryId
        content
        articleImages {
          id
          imageName
        }
      }
    }
  `
  const { loading, data } = useQuery(GET_ARTICLE, {
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    if (data && data.article) {
      const article = data.article
      setArticleTitle(article.title)
      setArticleData(article.content)
      setSelectedCategory(String(article.categoryId))
      if (article.articleImages) {
        setArticleImageList(
          article.articleImages.map((img: any) => img.imageName)
        )
      }
      setIsLoaded(true)
    }
  }, [data])

  const ADMIN_ARTICLE_IMAGE_UPLOAD = gql`
    mutation articleImageUpload($jwt: String!, $file: Upload!) {
      articleImageUpload(jwt: $jwt, file: $file) {
        filePath
        status
      }
    }
  `
  const [uploadImage, { data: uploadData }] = useMutation(
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

  useEffect(() => {
    if (uploadData) {
      simpleMde.codemirror.replaceSelection(
        "![](" + uploadData.articleImageUpload.filePath + ")"
      )
      setArticleImageList([
        ...articleImageList,
        uploadData.articleImageUpload.filePath as string,
      ])
    }
  }, [uploadData])

  if (loading) {
    return (
      <div className=" flex justify-center items-center">
        <ArticleLoading />
      </div>
    )
  }

  return (
    <>
      <Typography className=" text-4xl font-bold">記事編集</Typography>
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
          {isLoaded && (
            <SelectArticleCategory
              onChange={setSelectedCategory}
              initialValue={selectedCategory}
            />
          )}
          <EditArticleSubmit
            articleId={articleId}
            articleImages={articleImageList}
            articleTitle={articleTitle}
            articleBody={articleData}
            articlaCategoryId={selectedCategory}
          />
        </div>
      </div>
      <div className=" mt-5 w-11/12">
        {isLoaded && (
          <SimpleMDE
            id="simple-mde"
            getMdeInstance={getInstance}
            onChange={onArticleDataChange}
            events={{ paste: handlePaste }}
            value={articleData}
            options={{ spellChecker: false }}
          />
        )}
      </div>
    </>
  )
}
