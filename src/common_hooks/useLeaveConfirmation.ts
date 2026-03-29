"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export const useLeaveConfirmation = (isDirty: boolean) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const pendingUrlRef = useRef<string | null>(null)
  const bypassRef = useRef(false)

  // ブラウザのリロード・タブを閉じる際の警告
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  // Next.js SPAナビゲーションの遮断
  useEffect(() => {
    if (!isDirty) return

    const original = window.history.pushState.bind(window.history)

    window.history.pushState = (
      state: unknown,
      title: string,
      url?: string | URL | null
    ) => {
      if (bypassRef.current) {
        bypassRef.current = false
        original(state, title, url)
        return
      }
      // URLパスが実際に変わる場合のみ離脱確認（Next.js内部のスクロール保存等は通す）
      const newUrl = url?.toString() ?? null
      const currentPath = window.location.pathname + window.location.search
      if (!newUrl || newUrl === currentPath || newUrl === window.location.href) {
        original(state, title, url)
        return
      }
      pendingUrlRef.current = newUrl
      setShowModal(true)
    }

    return () => {
      window.history.pushState = original
    }
  }, [isDirty])

  // 離脱を確定してナビゲーション実行
  const handleConfirm = () => {
    setShowModal(false)
    const url = pendingUrlRef.current
    pendingUrlRef.current = null
    if (url) {
      bypassRef.current = true
      router.push(url)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    pendingUrlRef.current = null
  }

  // 保存成功時など、意図的なナビゲーションにガードをかけずに遷移する
  const bypassNavigate = (url: string) => {
    bypassRef.current = true
    router.push(url)
  }

  return { showModal, handleConfirm, handleCancel, bypassNavigate }
}
