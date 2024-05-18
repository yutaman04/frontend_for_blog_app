'use client'
import { ApolloProviderClientWrapper } from '@/components/graphql/apolloProviderClientWrapper'
import { Button, Card, Grid, Input, Typography } from '@mui/material'
import { Form, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {
  ERROR_AUTH_FAIL,
  ERROR_USER_NOT_FOUND,
  SUCCESS,
} from '@/config/apiMessages'
import { useRouter } from 'next/navigation'
import useAuthInfo from '@/common_hooks/useAuthInfo'

interface Props {}
type ContactFormData = Yup.InferType<typeof schema>
const schema = Yup.object().shape({
  username: Yup.string().required('ユーザー名は必須項目です').max(255),
  password: Yup.string().required('パスワードは必須項目です').max(255),
})

export const AdminLoginForm: React.FC<Props> = ({}) => {
  const { setAuthInfoToLocalStrage } = useAuthInfo()
  const LoginForm = () => {
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
      control,
    } = useForm<ContactFormData>({
      resolver: yupResolver(schema), // Yupとの紐づけ
      mode: 'onBlur', // バリデーションチェックのタイミングを設定
    })
    const LOGIN_MUTATION = gql`
      mutation Login($username: String!, $password: String!) {
        login(userName: $username, password: $password) {
          jwt
          msg
        }
      }
    `
    const [loginMutation] = useMutation(LOGIN_MUTATION)
    const [authMessage, setAuthMessage] = useState(null)
    const router = useRouter()

    // 認証リクエストを送信
    const onSubmit = async (data: { username: string; password: string }) => {
      try {
        const response = await loginMutation({
          variables: {
            username: data.username,
            password: data.password,
          },
        })
        if (response.data.login.msg === SUCCESS) {
          setAuthInfoToLocalStrage(
            response.data.login.jwt,
            getValues('username')
          )
          router.push('/admin/summary')
        } else {
          let msg = response.data.login.msg
          if (response.data.login.msg === ERROR_USER_NOT_FOUND) {
            msg = 'ユーザーが見つかりませんでした'
          } else if (response.data.login.msg === ERROR_AUTH_FAIL) {
            msg = 'パスワードが間違っています'
          }

          setAuthMessage(msg)
        }
        // ログイン成功の処理
      } catch (error) {
        // エラー処理
        alert(error)
      }
    }

    // formのonSubmitの型エラー対策のためWrapする
    const submitWraper = () => {
      handleSubmit((data) => {
        onSubmit(data)
      })()
    }

    return (
      <Form onSubmit={submitWraper} control={control}>
        <Card
          className="items-center justify-center"
          style={{ maxWidth: '80vw', width: 400 }}
        >
          <Typography className=" text-lg font-bold w-full text-center">
            管理者ログイン
          </Typography>
          {authMessage && (
            <p className=" text-red-600 text-xs text-center">{authMessage}</p>
          )}
          <Grid container m={5} className="w-full">
            <Grid item xs={3} className="flex items-center">
              <Typography>ユーザー名</Typography>
            </Grid>
            <Grid item xs={9}>
              <Input {...register('username')} />
              {errors.username && (
                <p className=" text-red-600 text-xs">
                  {errors.username.message}
                </p>
              )}
            </Grid>
            <Grid item xs={3} className="flex items-center">
              <Typography>パスワード</Typography>
            </Grid>
            <Grid item xs={9}>
              <Input {...register('password')} type="password" />
              {errors.password && (
                <p className=" text-red-600 text-xs">
                  {errors.password.message}
                </p>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            className="bg-blue-400 hover:bg-blue-300 text-white rounded px-4 py-2 m-2 w-4/5 flex justify-cente"
          >
            ログイン
          </Button>
        </Card>
      </Form>
    )
  }

  return (
    <ApolloProviderClientWrapper>
      <LoginForm />
    </ApolloProviderClientWrapper>
  )
}
