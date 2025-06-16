// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DashboardPage = () => {
    const theme = useTheme();

    // أنماط للبطاقات الإحصائية
    const statCardStyle = {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderRadius: '16px',
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                لوحة التحكم الرئيسية
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={statCardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>الطلاب</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1 }}>
                            150
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={statCardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>المعلمون</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1 }}>
                            12
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={statCardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>الحلقات</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1 }}>
                            25
                        </Typography>
                    </Paper>
                </Grid>
                 <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={statCardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>الأرباح الشهرية</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1 }}>
                            $5,400
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            
            {/* يمكنك إضافة المزيد من المكونات هنا لاحقًا مثل الرسوم البيانية أو آخر الأنشطة */}
        </Box>
    );
};

export default DashboardPage;