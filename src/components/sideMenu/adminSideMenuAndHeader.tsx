'use client'
import {
  ADMIN_SIDE_MENUE,
  ADMIN_SIDMENU_ADD_ARTICLE,
  ADMIN_SIDMENU_ADD_FIXED_PAGE_EDIT,
  ADMIN_SIDMENU_ARTICLES,
  ADMIN_SIDMENU_SUMMARY,
} from '@/config/constantText'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  menuItemClasses,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { useRouter } from 'next/navigation'
import SummarizeIcon from '@mui/icons-material/Summarize'
import ArticleIcon from '@mui/icons-material/Article'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import LogoutIcon from '@mui/icons-material/Logout'

interface Props {}
export default function AdminSideMenuAndHeader() {
  const drawerWidth = 240
  const { deleteAuthInfoFromLocalStrage } = useAuthInfo()
  const router = useRouter()

  const handleLogout = () => {
    deleteAuthInfoFromLocalStrage()
    router.push('/admin-login')
  }
  return (
    <>
      <AppBar
        component="header"
        className=" flex font-extrabold bg-slate-500 h-10"
        style={{ zIndex: 10000 }}
      >
        <Box className=" justify-end">
          <AccountCircleIcon className=" h-8" />
        </Box>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {ADMIN_SIDE_MENUE.map((menu, index) => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton href={menu.href}>
                  <ListItemIcon>
                    {menu.name === ADMIN_SIDMENU_SUMMARY && <SummarizeIcon />}
                    {menu.name === ADMIN_SIDMENU_ARTICLES && <ArticleIcon />}
                    {menu.name === ADMIN_SIDMENU_ADD_ARTICLE && <NoteAddIcon />}
                    {menu.name === ADMIN_SIDMENU_ADD_FIXED_PAGE_EDIT && (
                      <DocumentScannerIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText>ログアウト</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
