"use client"
import React from "react"
import { Grid, Input, Typography } from "@mui/material"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

export const CreateArticleWrapper: React.FC = ({}) => {
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
        <SimpleMDE id="simple-mde" />
      </div>
    </>
  )
}
