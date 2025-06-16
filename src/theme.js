// src/theme.js

import { createTheme } from '@mui/material/styles';

// لوحة الألوان الجديدة الاحترافية
const PALETTE = {
    primary: '#5a8a38', // الأخضر الأساسي
    background: '#1C2536', // كحلي داكن للخلفية
    paper: '#252E3E', // لون أغمق قليلاً للأسطح والبطاقات
    textPrimary: '#E0E0E0', // لون النصوص الأساسي
    textSecondary: '#A9A9A9', // لون النصوص الثانوي
};

export const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    primary: {
      main: PALETTE.primary,
    },
    ...(mode === 'dark'
      ? {
          background: {
            default: PALETTE.background,
            paper: PALETTE.paper,
          },
          text: {
            primary: PALETTE.textPrimary,
            secondary: PALETTE.textSecondary,
          },
        }
      : { // الوضع الفاتح (يمكن تخصيصه لاحقًا إذا أردنا)
          background: {
            default: '#f4f6f8',
            paper: '#ffffff',
          },
          text: {
            primary: '#212b36',
            secondary: '#637381',
          },
        }),
  },
  typography: {
    fontFamily: ['Cairo', 'sans-serif'].join(','),
    fontWeightBold: 700,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { color: PALETTE.textSecondary },
    body1: { color: PALETTE.textPrimary },
  },
  components: {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none', // لإلغاء أي تدرجات افتراضية
                borderRadius: '16px',
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                border: 'none',
            }
        }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 700,
        },
        containedPrimary: {
            boxShadow: `0 8px 16px 0 rgba(90, 138, 56, 0.24)`,
        }
      }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                 boxShadow: '0 0 2px 0 rgba(0,0,0,0.2), 0 12px 24px -4px rgba(0,0,0,0.12)',
                 borderRadius: '16px',
            }
        }
    }
  },
});