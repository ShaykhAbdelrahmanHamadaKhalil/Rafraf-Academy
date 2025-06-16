// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';

const DashboardPage = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                مرحباً بك في لوحة التحكم
            </Typography>
            <Typography variant="body1">
                من هنا يمكنك إدارة كل ما يخص الأكاديمية.
            </Typography>
        </Box>
    );
};

export default DashboardPage;