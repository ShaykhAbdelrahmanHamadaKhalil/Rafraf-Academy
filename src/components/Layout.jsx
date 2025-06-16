// src/components/Layout.jsx
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 2.5),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
  const [open, setOpen] = useState(true);
  const colorMode = React.useContext(ColorModeContext);

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
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
           <Tooltip title={theme.palette.mode === 'dark' ? "وضع فاتح" : "وضع داكن"}>
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} anchor="right">
        <DrawerHeader>
            <Box component="img" src={logo} sx={{ height: 40, mr: 1.5, opacity: open ? 1 : 0 }} />
            <Typography variant="h6" noWrap sx={{fontWeight: 'bold', opacity: open ? 1 : 0 }}>أكاديمية رفرف</Typography>
        </DrawerHeader>
        <Divider />
        <List>
            {commonItems.map((item, index) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} component="a" href={item.path}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {adminItems.map((item, index) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} component="a" href={item.path}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}