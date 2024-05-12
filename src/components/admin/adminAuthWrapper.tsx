'use client'
import React from 'react'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { useRouter } from 'next/navigation'
import { gql, useMutation } from '@apollo/client'
import { SUCCESS } from '@/config/apiMessages'

interface Props {
  children: React.ReactNode
}

export const AdminAuthWrapper: React.FC<Props> = ({ children }) => {
  const { authInfoHasDecision, getAutuInfo } = useAuthInfo()
  const router = useRouter()
  const JWT_VERIFICATION_QUERY = gql`
    mutation jwtVerification($targetJwt: String!) {
      jwtVerification(targetJwt: $targetJwt) {
        msg
      }
    }
  `
  const [jwtVerificationMutation] = useMutation(JWT_VERIFICATION_QUERY)
  const jwtVerification = async (jwt: string) => {
    try {
      const response = await jwtVerificationMutation({
        variables: {
          targetJwt: jwt,
        },
      })
      if (response.data.jwtVerification.msg !== SUCCESS) {
        router.push('/admin-login')
      }
    } catch (err) {
      // エラー処理
      alert(err)
      router.push('/admin-login')
    }
  }

  if (!authInfoHasDecision()) {
    router.push('/admin-login')
  } else {
    const jwt = getAutuInfo().jwt
    if (jwt) {
      jwtVerification(jwt)
    } else {
      router.push('/admin-login')
    }
  }
  return <>{children}</>
}
