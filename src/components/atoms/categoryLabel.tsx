'use client'
import React from 'react'
import Link from 'next/link'

interface Props {
  categoryId: number
  categoryName: string
}

export const CategoryLabel: React.FC<Props> = ({
  categoryId,
  categoryName,
}) => {
  return (
    <Link className=" bg-orange-300 p-1 rounded-sm tracking-wide" href={'#'}>
      {categoryName}
    </Link>
  )
}
