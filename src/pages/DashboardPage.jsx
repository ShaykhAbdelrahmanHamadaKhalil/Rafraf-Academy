// src/pages/DashboardPage.jsx

import React from 'react';
// تم التأكد من وجود كل المكونات المطلوبة هنا
import { Typography, Box, Paper, Grid, useTheme, Button, Divider, Avatar } from '@mui/material';

// استخدام أيقونات MUI الـ Outlined لشكل أنظف
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddIcon from '@mui/icons-material/Add';

// مكون البطاقة الإحصائية
const StatCard = ({ title, value, icon, color }) => {
    return (
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ bgcolor: `${color}.lighter`, color: `${color}.dark`, width: 64, height: 64, borderRadius: '8px' }}>
                {icon}
            </Avatar>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
            </Box>
        </Paper>
    );
};

const DashboardPage = () => {
    const theme = useTheme();
    // إضافة تعريفات الألوان المخصصة في الثيم
    theme.palette.success.lighter = theme.palette.mode === 'light' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(40, 167, 69, 0.2)';
    theme.palette.success.dark = '#198754';
    theme.palette.info.lighter = theme.palette.mode === 'light' ? 'rgba(23, 162, 184, 0.1)' : 'rgba(23, 162, 184, 0.2)';
    theme.palette.info.dark = '#0DCAF0';
    theme.palette.warning.lighter = theme.palette.mode === 'light' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 193, 7, 0.2)';
    theme.palette.warning.dark = '#FFC107';

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        مرحباً بك مجدداً
                    </Typography>
                    <Typography color="text.secondary">
                        كل شيء يبدو على ما يرام.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    إضافة طالب
                </Button>
            </Box>

            {/* --- التعديل هنا: تم حذف خاصية "item" من مكونات Grid --- */}
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <StatCard 
                        title="إجمالي الطلاب" 
                        value="150" 
                        icon={<SchoolOutlinedIcon sx={{ fontSize: 32 }} />} 
                        color="success" 
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <StatCard 
                        title="إجمالي المعلمين" 
                        value="12" 
                        icon={<PeopleAltOutlinedIcon sx={{ fontSize: 32 }} />} 
                        color="info"
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <StatCard 
                        title="الحلقات النشطة" 
                        value="25" 
                        icon={<GroupsOutlinedIcon sx={{ fontSize: 32 }} />} 
                        color="warning" 
                    />
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    جدول الحلقات اليومي
                </Typography>
                <Typography sx={{ mt: 2 }} color="text.secondary">
                    (سيتم هنا عرض جدول الحلقات والمواعيد القادمة...)
                </Typography>
            </Paper>
        </Box>
    );
};

export default DashboardPage;