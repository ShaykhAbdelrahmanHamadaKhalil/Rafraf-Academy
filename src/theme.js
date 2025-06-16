// src/theme.js

import { createTheme } from '@mui/material/styles';

const PALETTE = {
    green: '#5a8a38',
    black: '#2d2d2d',
};

const theme = createTheme({
  direction: 'rtl', // تفعيل دعم الـ RTL
  palette: {
    primary: {
      main: PALETTE.green,
    },
    text: {
        primary: PALETTE.black,
    }
  },
  typography: {
    fontFamily: [
      'Cairo',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h5: {
        fontWeight: 700,
    },
    h6: {
        fontWeight: 700,
    },
    button: {
        fontWeight: 700,
    }
  },
  components: {
    // تخصيص شكل الأزرار
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 20px',
        }
      }
    },
    // تخصيص شكل حقول الإدخال
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;