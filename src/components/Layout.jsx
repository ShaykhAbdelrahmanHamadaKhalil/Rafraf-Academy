// src/components/Layout.jsx

import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // أيقونة جديدة للأمور المالية
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
        { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'الدردشة', icon: <ChatIcon />, path: '/chat' },
    ];

    const adminItems = [
        { text: 'المعلمون', icon: <SupervisorAccountIcon />, path: '/teachers' },
        { text: 'الطلاب', icon: <SchoolIcon />, path: '/students' },
        { text: 'المشرفون', icon: <PeopleIcon />, path: '/supervisors' },
        { text: 'الأمور المالية', icon: <MonetizationOnIcon />, path: '/finance' }, // <-- تم التعديل هنا
        { text: 'رموز الدعوة', icon: <VpnKeyIcon />, path: '/invitation-codes' },
    ];
    
    const settingsItem = { text: 'الإعدادات', icon: <SettingsIcon />, path: '/settings' };


    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, height: '64px' }}>
                 <Box component="img" src={logo} sx={{ height: 40, mr: 1 }} />
                 <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
            </Toolbar>
            <Divider />
            <List>
                {commonItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemIcon sx={{color: 'text.secondary'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <List>
                 {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemIcon sx={{color: 'text.secondary'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} /> {/* فراغ لدفع الإعدادات للأسفل */}
            <Divider />
             <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={settingsItem.path}>
                        <ListItemIcon sx={{color: 'text.secondary'}}>{settingsItem.icon}</ListItemIcon>
                        <ListItemText primary={settingsItem.text} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mr: { sm: `${drawerWidth}px` },
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
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
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
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, display: 'flex', flexDirection: 'column' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'background.default' }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;