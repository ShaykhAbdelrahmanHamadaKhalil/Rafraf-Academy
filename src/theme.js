// src/theme.js
import { createTheme } from '@mui/material/styles';

const PALETTE = {
    primary: '#6A994E', // درجة أخضر جديدة أكثر هدوءًا
};

export const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    primary: {
      main: PALETTE.primary,
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#F4F6F8',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#333333',
            secondary: '#666666',
          },
          divider: '#E4E7EB',
        }
      : {
          background: {
            default: '#1A2035', // لون داكن جديد للخلفية
            paper: '#2C344B',   // لون أغمق للبطاقات
          },
          text: {
            primary: '#EAECEE',
            secondary: '#A0AEC0',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography: {
    fontFamily: ['Tajawal', 'sans-serif'].join(','), // استخدام الخط الجديد
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h4: { fontWeight: 700, fontSize: '2.125rem' },
    h5: { fontWeight: 700, fontSize: '1.5rem' },
    h6: { fontWeight: 600, fontSize: '1.25rem' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
                boxShadow: 'none',
                border: '1px solid',
                borderColor: mode === 'light' ? '#E4E7EB' : 'rgba(255, 255, 255, 0.12)',
            }
        }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: 'none',
        },
        containedPrimary: {
            '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(106, 153, 78, 0.24)',
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
                    backgroundColor: `rgba(106, 153, 78, 0.16)`,
                    color: 'primary.main',
                    fontWeight: '700',
                    '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                    }
                }
            }
        }
    }
  },
});