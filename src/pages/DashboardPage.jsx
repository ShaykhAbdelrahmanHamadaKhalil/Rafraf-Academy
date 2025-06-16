// src/pages/DashboardPage.jsx

import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// --- التعديل الرئيسي هنا: تم فصل استيراد اللغة عن المكون الرئيسي ---
import { DataGrid } from '@mui/x-data-grid';
import { arSD } from '@mui/x-data-grid/locales'; // المسار الصحيح لملف اللغة العربية

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddIcon from '@mui/icons-material/Add';


// مكون البطاقة الإحصائية بتصميم جديد
const StatCard = ({ title, value, icon, color }) => {
    return (
        <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography color="text.secondary" gutterBottom>{title}</Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
                    {icon}
                </Avatar>
            </CardContent>
        </Card>
    );
};

// بيانات وهمية للجدول
const rows = [
  { id: 1, name: 'عبد الرحمن حمادة', class: 'حلقة الفرقان', teacher: 'الشيخ أحمد' },
  { id: 2, name: 'محمد علي', class: 'حلقة النور', teacher: 'الشيخ ياسر' },
  { id: 3, name: 'فاطمة الزهراء', class: 'حلقة الفرقان', teacher: 'الشيخ أحمد' },
  { id: 4, name: 'عائشة محمود', class: 'حلقة الإحسان', teacher: 'الشيخ إبراهيم' },
  { id: 5, name: 'يوسف خالد', class: 'حلقة النور', teacher: 'الشيخ ياسر' },
];

const columns = [
  { field: 'name', headerName: 'اسم الطالب', width: 200 },
  { field: 'class', headerName: 'اسم الحلقة', width: 200 },
  { field: 'teacher', headerName: 'اسم المعلم', width: 200 },
];


const DashboardPage = () => {
    const theme = useTheme();

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    لوحة التحكم
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} size="large">
                    إضافة حلقة جديدة
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="الطلاب" value="150" icon={<SchoolOutlinedIcon />} color="primary.main" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="المعلمون" value="12" icon={<PeopleAltOutlinedIcon />} color="secondary.main" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="الحلقات" value="25" icon={<GroupsOutlinedIcon />} color="warning.main" />
                </Grid>
            </Grid>

            <Card sx={{ p: 2, mt: 5 }}>
                 <Typography variant="h6" sx={{ fontWeight: 'bold', p: 2 }}>
                    آخر الطلاب المسجلين
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        // --- هنا نستخدم المتغير الذي استوردناه بشكل صحيح ---
                        localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default DashboardPage;