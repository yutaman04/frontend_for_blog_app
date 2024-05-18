'use client'
import { RecoilRoot, useRecoilState } from 'recoil'

interface Props {
  children: React.ReactNode
}

export const RecoilProvider: React.FC<Props> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
