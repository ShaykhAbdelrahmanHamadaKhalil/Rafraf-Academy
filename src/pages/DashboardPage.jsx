// src/pages/DashboardPage.jsx
import React from 'react';
import { Typography, Box, Paper, Grid, Button, Fade } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const StatCard = ({ title, value, icon, index }) => {
    return (
        <Fade in={true} timeout={500 * (index + 1)}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>{title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                </Box>
                <Box sx={{ 
                     width: 56, height: 56, borderRadius: '50%', display: 'flex', 
                     alignItems: 'center', justifyContent: 'center',
                     color: 'primary.main',
                     bgcolor: (theme) => `rgba(${theme.palette.primary.mainChannel} / 0.1)`
                 }}>
                    {icon}
                </Box>
            </Paper>
        </Fade>
    );
};

const DashboardPage = () => {
    const stats = [
        { title: "إجمالي الطلاب", value: "150", icon: <SchoolOutlinedIcon /> },
        { title: "إجمالي المعلمين", value: "12", icon: <PeopleAltOutlinedIcon /> },
        { title: "الحلقات النشطة", value: "25", icon: <GroupsOutlinedIcon /> },
    ];

    return (
        <Fade in={true} timeout={500}>
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
                    {stats.map((stat, index) => (
                        <Grid item xs={12} md={4} key={stat.title}>
                            <StatCard 
                                title={stat.title} 
                                value={stat.value} 
                                icon={stat.icon} 
                                index={index}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Fade in={true} timeout={2000}>
                    <Paper sx={{ p: 3, mt: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            جدول الحلقات اليومي
                        </Typography>
                        <Typography sx={{ mt: 2 }} color="text.secondary">
                            (سيتم هنا عرض جدول الحلقات والمواعيد القادمة...)
                        </Typography>
                    </Paper>
                </Fade>
            </Box>
        </Fade>
    );
};

export default DashboardPage;