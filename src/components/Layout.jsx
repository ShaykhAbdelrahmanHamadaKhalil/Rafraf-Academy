// src/components/Layout.jsx

import React from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App';

// استخدام أيقونات MUI الـ Outlined لشكل أنظف
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const drawerWidth = 250;

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ p: '24px 16px' }}>
                 <Box component="img" src={logo} sx={{ height: 40, mr: 1.5 }} />
                 <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(145, 158, 171, 0.24)' }} />
            <List sx={{ flexGrow: 1, p: '8px' }}>
                <ListItemText primary="عام" sx={{ px: 2, mb: 1, typography: 'caption', color: 'text.secondary', fontWeight: 'bold' }} />
                {commonItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton selected={index === 0} component="a" href={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                 <ListItemText primary="الإدارة" sx={{ px: 2, mt: 2, mb: 1, typography: 'caption', color: 'text.secondary', fontWeight: 'bold' }} />
                 {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ borderColor: 'rgba(145, 158, 171, 0.24)' }} />
             <List sx={{ p: '8px' }}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/settings">
                        <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="الإعدادات" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mr: { sm: `${drawerWidth}px` }, // القائمة على اليمين، إذن الهامش على اليمين
                }}
            >
                <Toolbar>
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title={theme.palette.mode === 'dark' ? "وضع فاتح" : "وضع داكن"}>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    anchor="right"
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    anchor="right"
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;