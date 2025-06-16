// src/components/Layout.jsx

import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App'; 

const drawerWidth = 240;

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const commonItems = [
        { text: 'لوحة التحكم', icon: <DashboardCustomizeOutlinedIcon />, path: '/dashboard' },
        { text: 'الدردشة', icon: <ForumOutlinedIcon />, path: '/chat' },
    ];

    const adminItems = [
        { text: 'المعلمون', icon: <CoPresentOutlinedIcon />, path: '/teachers' },
        { text: 'الطلاب', icon: <SchoolOutlinedIcon />, path: '/students' },
        { text: 'المشرفون', icon: <PeopleOutlineOutlinedIcon />, path: '/supervisors' },
        { text: 'الأمور المالية', icon: <ReceiptLongOutlinedIcon />, path: '/finance' },
        { text: 'رموز الدعوة', icon: <VpnKeyOutlinedIcon />, path: '/invitation-codes' },
    ];
    
    const settingsItem = { text: 'الإعدادات', icon: <SettingsOutlinedIcon />, path: '/settings' };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, flexShrink: 0 }}>
                 <Box component="img" src={logo} sx={{ height: 40, mr: 1 }} />
                 <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
            </Toolbar>
            <Divider />
            <List sx={{ flexGrow: 1 }}>
                {commonItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemIcon sx={{color: 'text.secondary', minWidth: '40px'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                 <Divider sx={{ my: 1 }} />
                 {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemIcon sx={{color: 'text.secondary', minWidth: '40px'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
             <List sx={{ flexShrink: 0 }}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={settingsItem.path}>
                        <ListItemIcon sx={{color: 'text.secondary', minWidth: '40px'}}>{settingsItem.icon}</ListItemIcon>
                        <ListItemText primary={settingsItem.text} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', direction: 'rtl' }}>
            {/* --- التعديل هنا: إزالة تحديد العرض ليصبح الشريط كاملاً --- */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                     <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                        {/* يمكن وضع عنوان الصفحة هنا لاحقًا */}
                     </Typography>

                    <Tooltip title={theme.palette.mode === 'dark' ? "وضع فاتح" : "وضع داكن"}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' } }} // يظهر فقط على الشاشات الصغيرة والمتوسطة
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' }, // يختفي على الشاشات الصغيرة
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {drawerContent}
            </Drawer>
             <Drawer
                anchor="right"
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' }, // يظهر فقط على الشاشات الصغيرة
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'background.default' }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;