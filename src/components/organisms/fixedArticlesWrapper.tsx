"use client"
import React, { useEffect, useState } from "react"
import { Article } from "@/config/interfaces"
import { gql, useQuery } from "@apollo/client"
import { Typography } from "@mui/material"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { ArticleLoading } from "@/components/atoms/articleLoading"
import { ColDef, ICellRendererParams } from "ag-grid-community"
import { ArticlePagenate } from "@/components/molecules/articlePagenate"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { DeleteArticleButton } from "@/components/molecules/deleteArticleButton"
import { ArticleIsActiveToggle } from "@/components/molecules/articleIsActiveToggle"

export const FixedArticlesWrapper: React.FC = () => {
  const searchParams = useSearchParams()
  const [currentOffset, setCurrentOffset] = useState(0)
  const [perPage] = useState(20)
  const [page, setPage] = useState(Number(searchParams.get("page")))

  const FIXED_ARTICLES_QUERY = gql`
    query {
      articles(limit: ${perPage}, offset: ${currentOffset}, articleType: FIXED) {
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
  const { loading, error, data, refetch } = useQuery(FIXED_ARTICLES_QUERY, {
    fetchPolicy: "network-only",
  })

  const columnList = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "タイトル" },
    { field: "categoryName", headerName: "カテゴリー" },
    { field: "isActive", headerName: "有効化" },
    { field: "createUserDisplayName", headerName: "作成者" },
    { field: "updatedAt", headerName: "更新日時" },
    { field: "createdAt", headerName: "作成日時" },
  ]

  const editLinkRenderer = (params: ICellRendererParams) => (
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

  const isActiveRenderer = (params: ICellRendererParams) => (
    <ArticleIsActiveToggle
      articleId={parseInt(params.data.id)}
      initialValue={params.data.isActive}
    />
  )

  const colDefs: ColDef[] = [
    ...columnList.map((col) => ({
      headerName: col.headerName,
      field: col.field,
      width: col.field === "title" ? 400 : col.field === "id" ? 50 : 200,
      cellRenderer: col.field === "isActive" ? isActiveRenderer : undefined,
    })),
    {
      headerName: "操作",
      field: "id",
      width: 200,
      cellRenderer: editLinkRenderer,
      sortable: false,
    },
  ]

  useEffect(() => {
    if (page === 0) {
      setPage(1)
      setCurrentOffset(0)
    } else {
      setCurrentOffset(page * perPage - perPage)
    }
  }, [page])

  useEffect(() => {
    if (data && data.articles) {
      setArticles(data.articles)
    }
  }, [data])

  return (
    <>
      <Typography className="text-4xl font-bold">固定記事一覧</Typography>

      {loading ? (
        <div className="flex justify-center items-center">
          <ArticleLoading />
        </div>
      ) : error ? (
        <Typography className="text-red-600 mt-4">データの取得に失敗しました</Typography>
      ) : articles.length === 0 ? (
        <Typography className="mt-4">固定記事はありません</Typography>
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
            customHref="/admin/fixed-articles"
          />
        </div>
      )}
    </>
  )
}
