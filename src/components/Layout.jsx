// src/components/Layout.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Box, AppBar, Toolbar, IconButton, Typography, List, ListItemButton, ListItemIcon, ListItemText, useTheme, Tooltip, CssBaseline, Drawer } from '@mui/material';
import logo from '../assets/logo.png';
import { ColorModeContext } from '../App';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';

const drawerWidth = 260;

export default function Layout({ children }) {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const menuItems = [
        { text: 'لوحة التحكم', icon: <DashboardRoundedIcon />, path: '/dashboard' },
        { text: 'الطلاب', icon: <SchoolRoundedIcon />, path: '/students' },
        { text: 'المعلمون', icon: <GroupRoundedIcon />, path: '/teachers' },
    ];

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2.5 }}>
                <Box component="img" src={logo} sx={{ height: 40, mr: 1.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>
                    أكاديمية رفرف
                </Typography>
            </Toolbar>
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component="a" href={item.path}
                        selected={location.pathname === item.path}
                        sx={{ mx: 2, my: 0.5, borderRadius: theme.shape.borderRadius }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{'.MuiTypography-root': { fontWeight: 500 }}}/>
                    </ListItemButton>
                ))}
            </List>
            <Box>
                <ListItemButton onClick={handleLogout} sx={{ mx: 2, my: 1, borderRadius: theme.shape.borderRadius }}>
                    <ListItemIcon><LogoutRoundedIcon /></ListItemIcon>
                    <ListItemText primary="تسجيل الخروج" />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    borderBottom: '1px solid',
                    borderColor: theme.palette.divider,
                    bgcolor: 'background.paper',
                    // جعل الشريط العلوي فوق القائمة الجانبية
                    zIndex: theme.zIndex.drawer + 1, 
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            color: 'text.primary',
                            display: { sm: 'none' },
                        }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary' }}>
                        {theme.palette.mode === 'dark' ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor="right"
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
                anchor="right"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}