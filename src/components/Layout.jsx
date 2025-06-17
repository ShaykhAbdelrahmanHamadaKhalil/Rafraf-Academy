// src/components/Layout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // استيراد المصادقة
import { signOut } from 'firebase/auth'; // استيراد دالة تسجيل الخروج
import { Box, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider, CssBaseline, Drawer as MuiDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App';

// الأيقونات
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // أيقونة تسجيل الخروج

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
  const navigate = useNavigate(); // للتحويل بعد تسجيل الخروج

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // العودة لصفحة تسجيل الدخول
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const menuItems = [
    { text: 'لوحة التحكم', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
    { text: 'الطلاب', icon: <SchoolOutlinedIcon />, path: '/students' },
    { text: 'المعلمون', icon: <PeopleAltOutlinedIcon />, path: '/teachers' },
    { text: 'الدردشة', icon: <ForumOutlinedIcon />, path: '/chat' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <Box component="a" href="/dashboard" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary' }}>
               <Box component="img" src={logo} sx={{ height: 40, mr: 1.5, display: { xs: 'none', sm: 'block' } }} />
               <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={theme.palette.mode === 'dark' ? "الوضع الفاتح" : "الوضع الداكن"}>
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary' }}>
                {theme.palette.mode === 'dark' ? <WbSunnyOutlinedIcon /> : <NightsStayOutlinedIcon />}
            </IconButton>
          </Tooltip>
          {/* --- زر تسجيل الخروج الجديد --- */}
          <Tooltip title="تسجيل الخروج">
            <IconButton onClick={handleLogout} sx={{ color: 'text.primary', mr: 1 }}>
                <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} anchor="right" onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
        <Toolbar /> 
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {menuItems.map((item) => (
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}