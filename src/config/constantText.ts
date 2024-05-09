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
