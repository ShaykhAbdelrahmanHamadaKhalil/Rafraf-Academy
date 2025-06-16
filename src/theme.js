// src/theme.js

import { createTheme } from '@mui/material/styles';

const PALETTE = {
    green: '#5a8a38',
    black: '#2d2d2d',
};

// هذه الدالة ستنشئ الثيم بناءً على الوضع (فاتح أو داكن)
export const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode, // 'light' or 'dark'
    primary: {
      main: PALETTE.green,
    },
    ...(mode === 'light'
      ? {
          // قيم الوضع الفاتح
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          text: {
            primary: '#2d2d2d',
            secondary: '#6c757d',
          },
        }
      : {
          // قيم الوضع الداكن
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
          },
        }),
  },
  typography: {
    fontFamily: ['Cairo', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '16px',
          fontWeight: 700,
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: mode === 'light' ? '#e0e0e0' : '#333',
            }
        }
    }
  },
});