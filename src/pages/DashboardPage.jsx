// src/pages/DashboardPage.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { useTheme } from '@mui/material/styles';

const StatCard = ({ title, value, icon, color }) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 4,
                border: '1px solid',
                borderColor: theme.palette.divider,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{
                    width: 48, height: 48, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    bgcolor: `${color}.lighter`, color: `${color}.main`, mr: 2
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{title}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default function DashboardPage() {
    const theme = useTheme();

    const stats = [
        { title: 'الطلاب الفعالين', value: '73', icon: <SchoolRoundedIcon />, color: 'primary' },
        { title: 'المعلمون', value: '12', icon: <GroupRoundedIcon />, color: 'success' },
        { title: 'الحلقات النشطة', value: '25', icon: <AutoStoriesRoundedIcon />, color: 'warning' },
        { title: 'الأرباح (SAR)', value: '4,720', icon: <PaidRoundedIcon />, color: 'error' },
    ];
    
    // لكي تعمل الألوان المخصصة، سنضيفها للثيم
    theme.palette.success.lighter = '#E9FCD4';
    theme.palette.warning.lighter = '#FFF7CD';
    theme.palette.error.lighter = '#FFE7D9';
    theme.palette.primary.lighter = theme.palette.secondary.main; // استخدام اللون الأخضر الفاتح

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                صباح الخير، عبد الرحمن!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
                إليك ملخص أداء الأكاديمية اليوم.
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={6} lg={3} key={stat.title}>
                        <StatCard
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}