// src/pages/DashboardPage.jsx
import React from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

// مكون البطاقة الإحصائية بالتصميم الجديد
const StatCard = ({ title, value, icon }) => {
    return (
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>{title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                </Box>
                 <Box sx={{ 
                     width: 48, height: 48, borderRadius: '50%', display: 'flex', 
                     alignItems: 'center', justifyContent: 'center',
                     color: 'primary.main',
                     bgcolor: (theme) => `rgba(${theme.palette.primary.mainChannel} / 0.12)`
                 }}>
                    {icon}
                </Box>
            </Box>
        </Paper>
    );
};

const DashboardPage = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    لوحة التحكم
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} size="large">
                    إنشاء حلقة جديدة
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="إجمالي الطلاب" 
                        value="150" 
                        icon={<SchoolOutlinedIcon />} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="إجمالي المعلمين" 
                        value="12" 
                        icon={<PeopleAltOutlinedIcon />} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        title="الحلقات النشطة" 
                        value="25" 
                        icon={<GroupsOutlinedIcon />} 
                    />
                </Grid>
            </Grid>

            {/* قسم آخر يمكن إضافته لاحقًا */}
            <Paper sx={{ p: 3, mt: 4, borderRadius: '16px' }}>
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