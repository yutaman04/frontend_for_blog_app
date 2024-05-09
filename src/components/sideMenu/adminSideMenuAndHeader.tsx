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

interface Props {}
export default function AdminSideMenuAndHeader() {
  const drawerWidth = 240
  return (
    <>
      <AppBar
        component="header"
        className=" flex font-extrabold bg-slate-500 h-10"
        style={{ zIndex: 10000 }}
      >
        {/* <Grid container spacing={0.5}></Grid> */}
        <Box className=" justify-end">
          <AccountCircleIcon />
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
        </Box>
      </Drawer>
    </>
  )
}
