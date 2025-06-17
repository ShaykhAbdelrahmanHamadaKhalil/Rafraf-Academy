// src/components/Layout.jsx
import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider, CssBaseline, Drawer as MuiDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const colorMode = React.useContext(ColorModeContext);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  
  const commonItems = [
    { text: 'لوحة التحكم', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
    { text: 'الدردشة', icon: <ForumOutlinedIcon />, path: '/chat' },
  ];
  const adminItems = [
    { text: 'المعلمون', icon: <PeopleAltOutlinedIcon />, path: '/teachers' },
    { text: 'الطلاب', icon: <SchoolOutlinedIcon />, path: '/students' },
    { text: 'المشرفون', icon: <AdminPanelSettingsOutlinedIcon />, path: '/supervisors' },
    { text: 'الأمور المالية', icon: <PaymentsOutlinedIcon />, path: '/finance' },
    { text: 'رموز الدعوة', icon: <VpnKeyOutlinedIcon />, path: '/invitation-codes' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Box component="a" href="/dashboard" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary' }}>
               <Box component="img" src={logo} sx={{ height: 45, mr: 1.5 }} />
               <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={theme.palette.mode === 'dark' ? "الوضع الفاتح" : "الوضع الداكن"}>
            {/* --- إصلاح لون الأيقونة هنا --- */}
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary' }}>
                {theme.palette.mode === 'dark' ? <WbSunnyOutlinedIcon /> : <NightsStayOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} anchor="right" onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
        <Toolbar /> {/* فراغ لإزاحة المحتوى للأسفل */}
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {commonItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }} component="a" href={item.path}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
             <List>
                {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }} component="a" href={item.path}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}