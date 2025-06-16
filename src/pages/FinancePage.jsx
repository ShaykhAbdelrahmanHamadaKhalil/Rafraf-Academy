// src/pages/FinancePage.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';

const FinancePage = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                الأمور المالية
            </Typography>
            <Typography variant="body1">
                سيتم هنا عرض وإدارة كل ما يتعلق بالأمور المالية والفواتير والاشتراكات.
            </Typography>
        </Box>
    );
};

export default FinancePage;