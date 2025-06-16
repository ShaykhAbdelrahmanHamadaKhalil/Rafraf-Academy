// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box, Paper, Grid, Avatar, Button, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// أيقونات احترافية
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// مكون البطاقة الإحصائية بتصميم جديد
const StatCard = ({ title, value, icon, subtitle }) => {
    const theme = useTheme();
    return (
        <Paper 
            variant="outlined"
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                borderRadius: '16px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography color="text.secondary" sx={{ fontWeight: '600' }}>{title}</Typography>
                {icon}
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
            </Box>
        </Paper>
    );
};


const DashboardPage = () => {
    const theme = useTheme();

    return (
        <Box>
            {/* رسالة الترحيب */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                لوحة التحكم
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                أهلاً بعودتك، إليك آخر مستجدات الأكاديمية.
            </Typography>

            {/* البطاقات الإحصائية بالتصميم الجديد */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="الطلاب" 
                        value="150" 
                        subtitle="+ 12 هذا الشهر" 
                        icon={<SchoolOutlinedIcon sx={{ color: 'primary.main', fontSize: 32 }} />} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="المعلمون" 
                        value="12" 
                        subtitle="+ 2 هذا الشهر" 
                        icon={<CoPresentOutlinedIcon sx={{ color: 'primary.main', fontSize: 32 }} />} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="الحلقات" 
                        value="25" 
                        subtitle="3 حلقات جديدة" 
                        icon={<GroupsOutlinedIcon sx={{ color: 'primary.main', fontSize: 32 }} />} 
                    />
                </Grid>
                 <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="الأرباح" 
                        value="$5,400" 
                        subtitle="آخر 30 يوم" 
                        icon={<ReceiptLongOutlinedIcon sx={{ color: 'primary.main', fontSize: 32 }} />} 
                    />
                </Grid>
            </Grid>

            {/* قسم الإجراءات السريعة */}
            <Paper variant="outlined" sx={{ p: 3, mt: 5, borderRadius: '16px', borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}>
                 <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    إجراءات سريعة
                </Typography>
                <Divider />
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
                        إضافة طالب جديد
                    </Button>
                     <Button variant="outlined" color="secondary" startIcon={<AddCircleOutlineIcon />}>
                        إنشاء حلقة جديدة
                    </Button>
                     <Button variant="outlined" color="secondary" startIcon={<AddCircleOutlineIcon />}>
                        إضافة معلم
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default DashboardPage;