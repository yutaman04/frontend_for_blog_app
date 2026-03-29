"use client"
import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"

type Props = {
  open: boolean
  pageName: string
  onConfirm: () => void
  onCancel: () => void
}

export const LeaveConfirmModal: React.FC<Props> = ({
  open,
  pageName,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>ページ離脱の確認</DialogTitle>
      <DialogContent>
        入力内容が保存されませんが、{pageName}から離脱してよろしいですか？
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit" variant="outlined">
          No
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
