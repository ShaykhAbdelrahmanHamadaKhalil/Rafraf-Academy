// src/theme.js
import { createTheme } from '@mui/material/styles';

// لوحة الألوان الجديدة المستوحاة من الهوية البصرية
const PALETTE = {
  primary: {
    main: '#2d6a4f', // أخضر غامق من الشعار
    light: '#40916c',
    dark: '#1b4332',
  },
  secondary: {
    main: '#b7e4c7', // أخضر فاتح من الشعار والخلفيات
  },
  background: {
    default: '#f8f9fa', // رمادي فاتح جدًا للخلفية
    paper: '#ffffff',   // أبيض نقي للبطاقات
  },
  text: {
    primary: '#212529', // أسود داكن غير حاد
    secondary: '#6c757d', // رمادي للنصوص الثانوية
  }
};

export const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    primary: PALETTE.primary,
    secondary: PALETTE.secondary,
    background: mode === 'light' ? PALETTE.background : {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: mode === 'light' ? PALETTE.text : {
      primary: '#EAECEE',
      secondary: '#A0AEC0',
    },
  },
  typography: {
    fontFamily: ['Cairo', 'sans-serif'].join(','), // تطبيق الخط الجديد
    fontWeightRegular: 400,
    fontWeightMedium: 600, // جعل الخط أعرض قليلاً
    fontWeightBold: 700,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: {
      fontWeight: 700,
    }
  },
  shape: {
    borderRadius: 12, // حواف دائرية أكثر احترافية
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: `0 8px 16px 0 rgba(45, 106, 79, 0.24)`,
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 12px',
          '&.Mui-selected': {
            backgroundColor: `rgba(45, 106, 79, 0.08)`,
            color: 'primary.dark',
            fontWeight: '700',
            '& .MuiListItemIcon-root': {
              color: 'primary.dark',
            }
          }
        }
      }
    }
  },
});