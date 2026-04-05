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
import { ArticleLoading } from "@/components/atoms/articleLoading"
import { ColDef, ICellRendererParams } from "ag-grid-community"
import { ArticlePagenate } from "@/components/molecules/articlePagenate"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { DeleteArticleButton } from "@/components/molecules/deleteArticleButton"
import { ArticleIsActiveToggle } from "@/components/molecules/articleIsActiveToggle"

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
  const { loading, error, data, refetch } = useQuery(ARTICLES_QUERY, { fetchPolicy: "network-only" })

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

  const editLinkRenderer = (params: ICellRendererParams) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link href={`/admin/articles/edit/${params.data.id}`}>
          <button style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "2px 12px", borderRadius: 4 }}>
            編集
          </button>
        </Link>
        <DeleteArticleButton
          articleId={parseInt(params.data.id)}
          onSuccess={() => refetch()}
        />
      </div>
    )
  }

  const isActiveRenderer = (params: ICellRendererParams) => {
    return (
      <ArticleIsActiveToggle
        articleId={parseInt(params.data.id)}
        initialValue={params.data.isActive}
      />
    )
  }

  const colDefs: ColDef[] = [
    ...columnList.map((article) => ({
      headerName: article.headerName,
      field: article.field,
      width: article.field === "title" ? 400 : article.field === "id" ? 50 : 200,
      cellRenderer: article.field === "isActive" ? isActiveRenderer : undefined,
    })),
    {
      headerName: "操作",
      field: "id",
      width: 200,
      cellRenderer: editLinkRenderer,
      sortable: false,
    },
  ]

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
