export interface Article {
  id: number
  title: string
  createdAt: string
  createUserName: string
  createUserId: number
  isActive: boolean
  updatedAt: string
  createUserDisplayName: string
  content: string
  categoryId: number
  categoryName: string
  articleImages: ArticleImage[]
}

export interface ArticleImage {
  id: number
  articleId: number
  imageName: string
  sortOrder: number
  isActive: boolean
  createUserId: number
  createUserName: string
  createUserDisplayName: string
  createdAt: string
  updatedAt: string
}
