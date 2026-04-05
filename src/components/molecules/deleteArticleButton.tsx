"use client"
import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"
import { useRouter } from "next/navigation"

type Props = {
  articleId: number
  onSuccess?: () => void
}

const DELETE_ARTICLE_MUTATION = gql`
  mutation deleteArticle($articleId: Int!, $jwt: String!) {
    deleteArticle(articleId: $articleId, jwt: $jwt) {
      articleId
      status
    }
  }
`

export const DeleteArticleButton: React.FC<Props> = ({
  articleId,
  onSuccess,
}) => {
  const router = useRouter()
  const myJwt = useRecoilValue(myJwtState)
  const [open, setOpen] = useState(false)
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION)

  const handleConfirm = () => {
    deleteArticle({ variables: { articleId, jwt: myJwt } }).then(() => {
      setOpen(false)
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/admin/articles")
      }
    })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        style={{ backgroundColor: "#ef4444", color: "#ffffff", marginLeft: 8 }}
        variant="contained"
      >
        記事を削除する
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>記事の削除確認</DialogTitle>
        <DialogContent>
          この記事を削除してよろしいですか？この操作は元に戻せません。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit" variant="outlined">
            No
          </Button>
          <Button onClick={handleConfirm} style={{ backgroundColor: "#ef4444", color: "#ffffff" }} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
