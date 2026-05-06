"use client"
import React, { useEffect, useState } from "react"
import { MenuItem, Select } from "@mui/material"
import { gql, useQuery } from "@apollo/client"
import { Category } from "@/config/interfaces"

type props = {
  onChange: (e: string) => void
  initialValue?: string
  articleType?: "NORMAL" | "FIXED"
}

export const SelectArticleCategory: React.FC<props> = ({ onChange, initialValue, articleType }) => {
  const GET_ARTICLE_CATEGORIES = articleType
    ? gql`
        query {
          categories(articleType: ${articleType}) {
            categoryName
            id
          }
        }
      `
    : gql`
        query {
          categories {
            categoryName
            id
          }
        }
      `

  const { data } = useQuery(GET_ARTICLE_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState("")

  // カテゴリーロード後に初期値をセット（ロード前にセットするとMUI out-of-range警告が発生する）
  useEffect(() => {
    if (data?.categories?.length > 0) {
      if (initialValue && !selectedCategory) {
        setSelectedCategory(initialValue)
        onChange(initialValue)
      } else if (!initialValue && !selectedCategory) {
        const firstId = String(data.categories[0].id)
        setSelectedCategory(firstId)
        onChange(firstId)
      }
    }
  }, [data])

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
