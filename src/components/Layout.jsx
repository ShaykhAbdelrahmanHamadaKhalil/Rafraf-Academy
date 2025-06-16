// src/components/Layout.jsx

import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, Divider, ListSubheader } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App'; 

// استيراد الأيقونات الجديدة من مكتبة Tabler Icons
import { 
    IconLayoutDashboard, IconMessages, IconSettings, IconUserShield, 
    IconSchool, IconUsers, IconKey, IconReceipt2 
} from '@tabler/icons-react';


const drawerWidth = 260;

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const commonItems = [
        { text: 'لوحة التحكم', icon: <IconLayoutDashboard size={20} />, path: '/dashboard' },
        { text: 'الدردشة', icon: <IconMessages size={20} />, path: '/chat' },
    ];
    const adminItems = [
        { text: 'المعلمون', icon: <IconUserShield size={20} />, path: '/teachers' },
        { text: 'الطلاب', icon: <IconSchool size={20} />, path: '/students' },
        { text: 'المشرفون', icon: <IconUsers size={20} />, path: '/supervisors' },
        { text: 'الأمور المالية', icon: <IconReceipt2 size={20} />, path: '/finance' },
        { text: 'رموز الدعوة', icon: <IconKey size={20} />, path: '/invitation-codes' },
    ];
    const settingsItem = { text: 'الإعدادات', icon: <IconSettings size={20} />, path: '/settings' };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Box component="img" src={logo} sx={{ height: 45, mr: 1.5 }} />
                 <Typography variant="h6" noWrap sx={{fontWeight: 'bold'}}>أكاديمية رفرف</Typography>
            </Box>
            <List>
                {commonItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ my: 0.5 }}>
                        <ListItemButton component="a" href={item.path} sx={{ borderRadius: '8px' }}>
                            <ListItemIcon sx={{color: 'text.secondary'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List subheader={<ListSubheader sx={{ bgcolor: 'transparent', color: 'text.secondary', fontWeight: 'bold' }}>الإدارة</ListSubheader>}>
                 {adminItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ my: 0.5 }}>
                        <ListItemButton component="a" href={item.path} sx={{ borderRadius: '8px' }}>
                            <ListItemIcon sx={{color: 'text.secondary'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
             <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={settingsItem.path} sx={{ borderRadius: '8px' }}>
                        <ListItemIcon sx={{color: 'text.secondary'}}>{settingsItem.icon}</ListItemIcon>
                        <ListItemText primary={settingsItem.text} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppBar 
                position="fixed" 
                elevation={0}
                sx={{ 
                    // الشريط العلوي بتصميم زجاجي
                    bgcolor: 'rgba(28, 37, 54, 0.7)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box></Box> {/* عنصر فارغ لدفع الأيقونات لليسار */}
                    <Box>
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
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: 'background.default' },
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
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: 'background.paper' },
                }}
            >
                {drawerContent}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;