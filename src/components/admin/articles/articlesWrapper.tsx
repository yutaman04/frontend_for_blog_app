/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react"
import useAuthInfo from "@/common_hooks/useAuthInfo"
import { Article } from "@/config/interfaces"
import { gql, useQuery } from "@apollo/client"
import { myJwtState } from "@/state/jwtState"
import { useRecoilValue } from "recoil"
import { Typography } from "@mui/material"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css" // Optional Theme applied to the grid
import { ArticleLoading } from "@/components/loading/articleLoading"
import { ColDef } from "ag-grid-community"
import { ArticlePagenate } from "@/components/article/articlePagenate"
import { useSearchParams } from "next/navigation"

export const ArticleWrapper: React.FC = () => {
  const searchParams = useSearchParams()
  // 取得のオフセット
  const [currentOffset, setCurrentOffset] = useState(0)
  // 1ページ当たりの件数
  const [perPage, setParPage] = useState(20)
  // 現在のページ
  const [page, setPage] = useState(Number(searchParams.get("page")))
  const ARTICLES_QUERY = gql`
    query {
      articles(limit:${perPage}, offset:${currentOffset}) {
        id
        title
        categoryId
        categoryName
        content
        createUserDisplayName
        createUserId
        createUserName
        createdAt
        isActive
        updatedAt
        totalCount
        articleImages {
          articleId
          imageName
          id
          isActive
          sortOrder
        }
      }
    }
  `
  const [articles, setArticles] = useState<Article[]>([])
  const { loading, error, data, refetch } = useQuery(ARTICLES_QUERY)

  const columnList = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "title",
      headerName: "タイトル",
    },
    {
      field: "categoryName",
      headerName: "カテゴリー",
    },
    {
      field: "isActive",
      headerName: "有効化",
    },
    {
      field: "createUserDisplayName",
      headerName: "作成者",
    },
    {
      field: "updatedAt",
      headerName: "更新日時",
    },
    {
      field: "createdAt",
      headerName: "作成日時",
    },
  ]

  const colDefs = columnList.map((article) => {
    return {
      headerName: article.headerName,
      field: article.field,
      width: article.field === "title" ? 400 : 200,
    } as ColDef
  })

  // ページまたはperPageの更新時
  useEffect(() => {
    if (page === 0) {
      setPage(1)
      setCurrentOffset(0)
    } else {
      setCurrentOffset(page * perPage - perPage)
    }
  }, [page])
  // 記事一覧の取得
  useEffect(() => {
    if (data && data.articles) {
      setArticles(data.articles)
    }
  }, [data, setArticles])

  return (
    <>
      <Typography className=" text-4xl font-bold">記事一覧</Typography>

      {loading ? (
        <div className=" flex justify-center items-center">
          <ArticleLoading />
        </div>
      ) : (
        <div style={{ height: "80vh" }} className="ag-theme-quartz-auto-dark">
          <AgGridReact
            rowData={articles}
            columnDefs={colDefs}
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={perPage}
            paginationPageSizeSelector={false}
            rowHeight={50}
            suppressPaginationPanel={true}
          />
          <ArticlePagenate
            page={page}
            totalCount={data.articles[0].totalCount}
            perPage={perPage}
            customHref="/admin/articles"
          />
        </div>
      )}
    </>
  )
}
