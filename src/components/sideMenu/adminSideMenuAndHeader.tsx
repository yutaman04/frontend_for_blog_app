'use client'
import { ADMIN_SIDE_MENUE } from '@/config/constantText'
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
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useAuthInfo from '@/common_hooks/useAuthInfo'
import { useRouter } from 'next/navigation'

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
        {/* <Grid container spacing={0.5}></Grid> */}
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
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
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
                <ListItemIcon></ListItemIcon>
                <ListItemText>ログアウト</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
