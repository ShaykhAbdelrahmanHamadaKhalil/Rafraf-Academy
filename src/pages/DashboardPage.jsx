// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box, Paper, Grid, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// استيراد الأيقونات الجديدة
import { IconSchool, IconUserShield, IconUsers, IconReceipt2 } from '@tabler/icons-react';

const chartData = [
  { name: 'يناير', students: 12 }, { name: 'فبراير', students: 19 },
  { name: 'مارس', students: 25 }, { name: 'أبريل', students: 35 },
  { name: 'مايو', students: 51 }, { name: 'يونيو', students: 62 },
];

const StatCard = ({ title, value, icon, change, changeColor }) => {
    return (
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>{title}</Typography>
                {icon}
            </Box>
            <Box sx={{ mt: 3, flexGrow: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            </Box>
             <Typography variant="body2" component="span" sx={{ color: changeColor, fontWeight: '600' }}>
                {change}
            </Typography>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                عن الشهر الماضي
            </Typography>
        </Paper>
    );
};

const DashboardPage = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
                أهلاً بك في لوحة تحكم رفرف
            </Typography>

            <Grid container spacing={4}>
                {/* البطاقات الإحصائية */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="إجمالي الطلاب" value="150" 
                        icon={<IconSchool size={32} color={theme.palette.primary.main} />}
                        change="+12.5%" changeColor="success.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="المعلمون النشطون" value="12" 
                        icon={<IconUserShield size={32} color={theme.palette.info.main} />}
                        change="+5.2%" changeColor="success.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                     <StatCard 
                        title="الحلقات" value="25" 
                        icon={<IconUsers size={32} color={theme.palette.warning.main} />}
                        change="-2.1%" changeColor="error.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                     <StatCard 
                        title="الأرباح" value="$5.4k" 
                        icon={<IconReceipt2 size={32} color={theme.palette.error.main} />}
                        change="+15%" changeColor="success.main"
                    />
                </Grid>
                
                {/* الرسم البياني */}
                <Grid item xs={12} lg={12}>
                     <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                            الطلاب الجدد
                        </Typography>
                        <Box sx={{ height: 350 }}>
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} />
                                    <YAxis stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(145, 158, 171, 0.16)' }}
                                        contentStyle={{
                                            backgroundColor: theme.palette.background.paper,
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: theme.shadows[3]
                                        }}
                                    />
                                    <Bar dataKey="students" name="طالب جديد" barSize={24}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={theme.palette.primary.main} radius={[8, 8, 8, 8]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                     </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;