// src/theme.js

import { createTheme } from '@mui/material/styles';

const PALETTE = {
    primary: '#5a8a38', 
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
            default: '#F9FAFB', // رمادي فاتح جدًا للخلفية
            paper: '#FFFFFF',   // أبيض نقي للبطاقات
          },
          text: {
            primary: '#111827', // أسود ناعم
            secondary: '#6B7280', // رمادي متوسط
          },
        }
      : {
          background: {
            default: '#111827', // رمادي داكن جدًا
            paper: '#1F2937',   // لون أغمق للبطاقات
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
          },
        }),
  },
  typography: {
    fontFamily: ['Cairo', 'Inter', 'sans-serif'].join(','),
    h4: { fontWeight: 700, fontSize: '2rem' },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: mode === 'light' ? '#E5E7EB' : 'rgba(145, 158, 171, 0.24)',
                backgroundColor: mode === 'light' ? PALETTE.paper : '#1F2937CC', // شبه شفاف في الوضع الداكن
                backdropFilter: mode === 'dark' ? 'blur(6px)' : 'none',
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                border: 'none',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1F2937',
            }
        }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
                borderRadius: '12px',
                border: mode === 'light' ? '1px solid #E5E7EB' : 'none',
            }
        }
    },
    MuiCard: {
      styleOverrides: {
          root: {
              boxShadow: 'none',
          }
      }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: '8px',
                margin: '4px 8px',
                '&.Mui-selected': {
                    backgroundColor: 'rgba(90, 138, 56, 0.08)',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                    }
                }
            }
        }
    }
  },
});