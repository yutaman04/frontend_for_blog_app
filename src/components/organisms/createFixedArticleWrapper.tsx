/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Input, Typography } from "@mui/material"
import "easymde/dist/easymde.min.css"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { CreateFixedArticleSubmit } from "@/components/molecules/createFixedArticleSubmit"
import dynamic from "next/dynamic"
import { SelectArticleCategory } from "@/components/molecules/selectArticleCategory"
import { useLeaveConfirmation } from "@/common_hooks/useLeaveConfirmation"
import { LeaveConfirmModal } from "@/components/molecules/leaveConfirmModal"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

export const CreateFixedArticleWrapper: React.FC = () => {
  const [articleData, setArticleData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [articleImageList, setArticleImageList] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  let simpleMde: EasyMDE
  const getInstance = (instance: EasyMDE) => {
    simpleMde = instance
  }

  const onArticleDataChange = useCallback((value: string) => {
    setArticleData(value)
  }, [])

  const myJwt = useRecoilValue(myJwtState)

  const isDirty = articleTitle !== "" || articleData !== "" || selectedCategory !== ""
  const { showModal, handleConfirm, handleCancel, bypassNavigate } =
    useLeaveConfirmation(isDirty)

  const handleSubmitSuccess = () => {
    bypassNavigate("/admin/fixed-articles")
  }

  const ADMIN_ARTICLE_IMAGE_UPLOAD = gql`
    mutation articleImageUpload($jwt: String!, $file: Upload!) {
      articleImageUpload(jwt: $jwt, file: $file) {
        filePath
        status
      }
    }
  `
  const [uploadImage, { data: uploadData }] = useMutation(ADMIN_ARTICLE_IMAGE_UPLOAD)

  const handlePaste = useCallback((data: any, e: any) => {
    if (!e.clipboardData.files || e.clipboardData.files.length === 0) return
    const file = e.clipboardData.files[0]
    if (file.type === "image/png" && myJwt) {
      uploadImage({ variables: { jwt: myJwt, file: [file] } })
    }
  }, [myJwt, uploadImage])

  const editorOptions = useMemo(() => ({ spellChecker: false }), [])
  const editorEvents = useMemo(() => ({ paste: handlePaste }), [handlePaste])

  useEffect(() => {
    if (uploadData) {
      simpleMde.codemirror.replaceSelection(
        "![](" + uploadData.articleImageUpload.filePath + ")"
      )
      setArticleImageList((prev) => [...prev, uploadData.articleImageUpload.filePath as string])
    }
  }, [uploadData])

  return (
    <>
      <LeaveConfirmModal
        open={showModal}
        pageName="固定記事追加"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Typography className="text-4xl font-bold">固定記事追加</Typography>
      <div className="flex justify-center items-center">
        <div className="w-screen">
          タイトル
          <Input
            className="w-6/12 bg-white ml-5 border-l-stone-900"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          <SelectArticleCategory onChange={setSelectedCategory} articleType="FIXED" />
          <CreateFixedArticleSubmit
            articleImages={articleImageList}
            articleTitle={articleTitle}
            articleBody={articleData}
            articlaCategoryId={selectedCategory}
            onSuccess={handleSubmitSuccess}
          />
        </div>
      </div>
      <div className="mt-5 w-11/12">
        <SimpleMDE
          id="simple-mde-fixed"
          getMdeInstance={getInstance}
          onChange={onArticleDataChange}
          events={editorEvents}
          options={editorOptions}
        />
      </div>
    </>
  )
}
