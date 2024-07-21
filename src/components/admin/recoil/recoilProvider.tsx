/* eslint-disable react/prop-types */
"use client"
import { RecoilRoot } from "recoil"

interface Props {
  children: React.ReactNode
}

export const RecoilProvider: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <RecoilRoot>{children}</RecoilRoot>
}
