"use client"
import React, { useState } from "react"
import { FormControlLabel, Switch } from "@mui/material"
import { gql, useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { myJwtState } from "@/state/jwtState"

type Props = {
  articleId: number
  initialValue: boolean
  onSuccess?: (newValue: boolean) => void
}

const UPDATE_IS_ACTIVE_MUTATION = gql`
  mutation updateArticleIsActive(
    $articleId: Int!
    $isActive: Boolean!
    $jwt: String!
  ) {
    updateArticleIsActive(
      articleId: $articleId
      isActive: $isActive
      jwt: $jwt
    ) {
      articleId
      status
    }
  }
`

export const ArticleIsActiveToggle: React.FC<Props> = ({
  articleId,
  initialValue,
  onSuccess,
}) => {
  const myJwt = useRecoilValue(myJwtState)
  const [isActive, setIsActive] = useState(initialValue)
  const [updateIsActive] = useMutation(UPDATE_IS_ACTIVE_MUTATION)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setIsActive(newValue)
    updateIsActive({
      variables: { articleId, isActive: newValue, jwt: myJwt },
    }).then(() => {
      if (onSuccess) onSuccess(newValue)
    })
  }

  return (
    <FormControlLabel
      control={
        <Switch checked={isActive} onChange={handleChange} color="primary" />
      }
      label="有効"
    />
  )
}
