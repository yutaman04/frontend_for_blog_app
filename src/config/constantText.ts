export const SITE_TITLE = 'Example Blog Title'
export type ADMIN_MENUE = {
  id: number
  name: string
  href: string
}
export const ADMIN_SIDE_MENUE = [
  {
    id: 1,
    name: 'サマリー',
    href: '/admin/summary',
  } as ADMIN_MENUE,
  {
    id: 2,
    name: '記事一覧',
    href: '/admin/articles',
  } as ADMIN_MENUE,
  {
    id: 3,
    name: '記事追加',
    href: '/admin/create-article',
  } as ADMIN_MENUE,
  {
    id: 4,
    name: '固定ページ編集',
    href: '/admin/fixed-page-edit',
  } as ADMIN_MENUE,
]

export const ADMIN_SUMMARY_LABELS = {
  TOTAL_AOUNT: '総記事数',
  DISABLE_COUNT: '非公開記事数',
  ENABLE_COUNT: '公開記事数',
  NEWER_ARTICLES: '直近投稿した3記事',
}
