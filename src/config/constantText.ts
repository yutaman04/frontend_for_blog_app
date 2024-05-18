export const SITE_TITLE = 'Example Blog Title'
export type ADMIN_MENUE = {
  id: number
  name: string
  href: string
}
export const ADMIN_SIDMENU_SUMMARY = 'サマリー'
export const ADMIN_SIDMENU_ARTICLES = '記事一覧'
export const ADMIN_SIDMENU_ADD_ARTICLE = '記事追加'
export const ADMIN_SIDMENU_ADD_FIXED_PAGE_EDIT = '固定ページ編集'
export const ADMIN_SIDE_MENUE = [
  {
    id: 1,
    name: ADMIN_SIDMENU_SUMMARY,
    href: '/admin/summary',
  } as ADMIN_MENUE,
  {
    id: 2,
    name: ADMIN_SIDMENU_ARTICLES,
    href: '/admin/articles',
  } as ADMIN_MENUE,
  {
    id: 3,
    name: ADMIN_SIDMENU_ADD_ARTICLE,
    href: '/admin/create-article',
  } as ADMIN_MENUE,
  {
    id: 4,
    name: ADMIN_SIDMENU_ADD_FIXED_PAGE_EDIT,
    href: '/admin/fixed-page-edit',
  } as ADMIN_MENUE,
]

export const ADMIN_SUMMARY_LABELS = {
  TOTAL_AOUNT: '総記事数',
  DISABLE_COUNT: '非公開記事数',
  ENABLE_COUNT: '公開記事数',
  NEWER_ARTICLES: '直近投稿した3記事',
}
