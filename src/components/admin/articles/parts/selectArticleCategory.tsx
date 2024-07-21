"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react"
import {
  Button,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { Category } from "@/config/interfaces"

type props = {
  onChange: (e: string) => void
}

export const SelectArticleCategory: React.FC<props> = ({ onChange }) => {
  const [articleData, setArticleData] = useState("")

  const onArticleDataChange = useCallback((value: string) => {
    setArticleData(value)
  }, [])

  const myJwt = useRecoilValue(myJwtState)

  const GET_ARTICLE_CATEGORIES = gql`
    query {
      categories {
        categoryName
        id
      }
    }
  `

  const { loading, error, data, refetch } = useQuery(GET_ARTICLE_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <Select
      color="primary"
      className=" w-2/12 bg-white ml-5 h-auto"
      onChange={(e) => {
        onChange(e.target.value as string)
        setSelectedCategory(e.target.value as string)
      }}
      defaultValue=""
      value={selectedCategory}
    >
      {data &&
        data.categories.map((category: Category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.categoryName}
          </MenuItem>
        ))}
    </Select>
  )
}
