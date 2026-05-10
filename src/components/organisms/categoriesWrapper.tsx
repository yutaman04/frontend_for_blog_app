"use client"
import React, { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { ArticleLoading } from "@/components/atoms/articleLoading"
import { useLeaveConfirmation } from "@/common_hooks/useLeaveConfirmation"
import { LeaveConfirmModal } from "@/components/molecules/leaveConfirmModal"

type ArticleType = "NORMAL" | "FIXED"

interface CategoryRow {
  localId: string
  id: string | null
  categoryName: string
  originalName: string
  articleType: ArticleType
  isActive: boolean
  originalIsActive: boolean
  isNew: boolean
}

const GET_ADMIN_CATEGORIES = gql`
  query adminCategories($jwt: String!) {
    adminCategories(jwt: $jwt) {
      id
      categoryName
      articleType
      isActive
      createdAt
      updatedAt
    }
  }
`

const CREATE_CATEGORY = gql`
  mutation createCategory($jwt: String!, $categoryName: String!, $articleType: ArticleTypeEnum!) {
    createCategory(jwt: $jwt, categoryName: $categoryName, articleType: $articleType) {
      categoryId
      status
    }
  }
`

const EDIT_CATEGORY = gql`
  mutation editCategory($jwt: String!, $categoryId: Int!, $categoryName: String!) {
    editCategory(jwt: $jwt, categoryId: $categoryId, categoryName: $categoryName) {
      categoryId
      status
    }
  }
`

const UPDATE_CATEGORY_IS_ACTIVE = gql`
  mutation updateCategoryIsActive($jwt: String!, $categoryId: Int!, $isActive: Boolean!) {
    updateCategoryIsActive(jwt: $jwt, categoryId: $categoryId, isActive: $isActive) {
      categoryId
      status
    }
  }
`

const DELETE_CATEGORY = gql`
  mutation deleteCategory($jwt: String!, $categoryId: Int!) {
    deleteCategory(jwt: $jwt, categoryId: $categoryId) {
      categoryId
      status
    }
  }
`

let localIdCounter = 0
const generateLocalId = () => `local-${++localIdCounter}`

export const CategoriesWrapper: React.FC = () => {
  const myJwt = useRecoilValue(myJwtState)
  const [rows, setRows] = useState<CategoryRow[]>([])
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  })

  const isDirty =
    rows.some((row) => row.isNew) ||
    rows.some((row) => !row.isNew && row.categoryName !== row.originalName) ||
    rows.some((row) => !row.isNew && row.isActive !== row.originalIsActive)

  const { showModal, handleConfirm, handleCancel } = useLeaveConfirmation(isDirty)

  const { loading, error, data, refetch } = useQuery(GET_ADMIN_CATEGORIES, {
    variables: { jwt: myJwt },
    fetchPolicy: "network-only",
  })

  const [createCategory] = useMutation(CREATE_CATEGORY)
  const [editCategory] = useMutation(EDIT_CATEGORY)
  const [updateCategoryIsActive] = useMutation(UPDATE_CATEGORY_IS_ACTIVE)
  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  useEffect(() => {
    if (data?.adminCategories) {
      setRows(
        data.adminCategories.map((cat: { id: string; categoryName: string; articleType: ArticleType; isActive: boolean }) => ({
          localId: generateLocalId(),
          id: cat.id,
          categoryName: cat.categoryName,
          originalName: cat.categoryName,
          articleType: cat.articleType,
          isActive: cat.isActive,
          originalIsActive: cat.isActive,
          isNew: false,
        }))
      )
    }
  }, [data])

  const handleNameChange = (localId: string, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.localId === localId ? { ...row, categoryName: value } : row))
    )
  }

  const handleIsActiveChange = (localId: string, newValue: boolean) => {
    setRows((prev) =>
      prev.map((row) => (row.localId === localId ? { ...row, isActive: newValue } : row))
    )
  }

  const handleArticleTypeChange = (localId: string, value: ArticleType) => {
    setRows((prev) =>
      prev.map((row) => (row.localId === localId ? { ...row, articleType: value } : row))
    )
  }

  const handleDelete = (row: CategoryRow) => {
    if (!row.isNew && row.id !== null) {
      deleteCategory({ variables: { categoryId: parseInt(row.id), jwt: myJwt } })
        .then(() => {
          setRows((prev) => prev.filter((r) => r.localId !== row.localId))
        })
        .catch(() => {
          setSnackbar({ open: true, message: "削除に失敗しました", severity: "error" })
        })
    } else {
      setRows((prev) => prev.filter((r) => r.localId !== row.localId))
    }
  }

  const handleAdd = () => {
    setRows((prev) => [
      ...prev,
      {
        localId: generateLocalId(),
        id: null,
        categoryName: "",
        originalName: "",
        articleType: "NORMAL",
        isActive: true,
        originalIsActive: true,
        isNew: true,
      },
    ])
  }

  const handleSave = async () => {
    const nameEditTargets = rows.filter(
      (row) => !row.isNew && row.id !== null && row.categoryName.trim() !== "" && row.categoryName !== row.originalName
    )
    const isActiveEditTargets = rows.filter(
      (row) => !row.isNew && row.id !== null && row.isActive !== row.originalIsActive
    )
    const createTargets = rows.filter(
      (row) => row.isNew && row.categoryName.trim() !== ""
    )

    if (nameEditTargets.length === 0 && isActiveEditTargets.length === 0 && createTargets.length === 0) {
      setSnackbar({ open: true, message: "変更はありません", severity: "success" })
      return
    }

    try {
      await Promise.all([
        ...nameEditTargets.map((row) =>
          editCategory({ variables: { jwt: myJwt, categoryId: parseInt(row.id!), categoryName: row.categoryName.trim() } })
        ),
        ...isActiveEditTargets.map((row) =>
          updateCategoryIsActive({ variables: { jwt: myJwt, categoryId: parseInt(row.id!), isActive: row.isActive } })
        ),
        ...createTargets.map((row) =>
          createCategory({ variables: { jwt: myJwt, categoryName: row.categoryName.trim(), articleType: row.articleType } })
        ),
      ])
      setSnackbar({ open: true, message: "保存しました", severity: "success" })
      refetch()
    } catch {
      setSnackbar({ open: true, message: "保存に失敗しました", severity: "error" })
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography className="text-4xl font-bold">カテゴリー管理</Typography>
        <Button
          variant="contained"
          onClick={handleSave}
          style={{ backgroundColor: "#3b82f6", color: "#ffffff" }}
        >
          更新
        </Button>
      </Box>

      {loading ? (
        <div className="flex justify-center items-center">
          <ArticleLoading />
        </div>
      ) : error ? (
        <Typography className="text-red-600 mt-4">データの取得に失敗しました</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={80}>ID</TableCell>
                <TableCell>カテゴリー名</TableCell>
                <TableCell width={160}>記事タイプ</TableCell>
                <TableCell width={80}>有効</TableCell>
                <TableCell width={60} />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.localId}>
                  <TableCell>{row.isNew ? "新規" : row.id}</TableCell>
                  <TableCell>
                    <TextField
                      value={row.categoryName}
                      onChange={(e) => handleNameChange(row.localId, e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    {row.isNew ? (
                      <Select
                        value={row.articleType}
                        onChange={(e) => handleArticleTypeChange(row.localId, e.target.value as ArticleType)}
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="NORMAL">通常</MenuItem>
                        <MenuItem value="FIXED">固定</MenuItem>
                      </Select>
                    ) : (
                      <Chip
                        label={row.articleType === "NORMAL" ? "通常" : "固定"}
                        size="small"
                        color={row.articleType === "FIXED" ? "warning" : "default"}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {!row.isNew && (
                      <Switch
                        checked={row.isActive}
                        onChange={(e) => handleIsActiveChange(row.localId, e.target.checked)}
                        color="primary"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row)} size="small" color="error">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={2}>
        <IconButton onClick={handleAdd} color="primary" style={{ border: "1px solid", borderRadius: 4 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <LeaveConfirmModal
        open={showModal}
        pageName="カテゴリー管理"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
