// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box, Paper, Grid, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// أيقونات للبطاقات
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// بيانات وهمية للرسم البياني
const chartData = [
  { name: 'يناير', students: 12 },
  { name: 'فبراير', students: 19 },
  { name: 'مارس', students: 25 },
  { name: 'أبريل', students: 35 },
  { name: 'مايو', students: 51 },
  { name: 'يونيو', students: 62 },
];

// مكون البطاقة الإحصائية
const StatCard = ({ title, value, icon, color }) => {
    const theme = useTheme();
    return (
        <Paper 
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '16px',
            }}
        >
            <Box>
                <Typography color="text.secondary" gutterBottom>{title}</Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
                {icon}
            </Avatar>
        </Paper>
    );
};


const DashboardPage = () => {
    const theme = useTheme();

    return (
        <Box>
            {/* رسالة الترحيب */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                أهلاً بعودتك، يا مدير!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                إليك ملخص سريع لنشاط الأكاديمية.
            </Typography>

            {/* البطاقات الإحصائية */}
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard title="إجمالي الطلاب" value="150" icon={<SchoolIcon />} color="#5a8a38" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard title="إجمالي المعلمين" value="12" icon={<SupervisorAccountIcon />} color="#3f51b5" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard title="الحلقات النشطة" value="25" icon={<GroupsIcon />} color="#f57c00" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard title="أرباح الشهر" value="$5,400" icon={<MonetizationOnIcon />} color="#d32f2f" />
                </Grid>
            </Grid>

            {/* قسم الرسم البياني */}
            <Paper sx={{ p: 3, mt: 5, borderRadius: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                    نمو عدد الطلاب الجدد (آخر 6 أشهر)
                </Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: theme.palette.background.paper,
                                    direction: 'rtl',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="students" name="طالب جديد" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box>
    );
};

export default DashboardPage;