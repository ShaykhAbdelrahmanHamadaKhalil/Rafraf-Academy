// src/theme.js
import { createTheme } from '@mui/material/styles';

// لوحة الألوان الجديدة
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
            default: '#F9FAFB', 
            paper: '#FFFFFF',
          },
          text: {
            primary: '#111827',
            secondary: '#6B7280',
          },
          divider: '#E5E7EB',
        }
      : {
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#AAB0BB',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography: {
    fontFamily: ['Cairo', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: 'var(--mui-palette-divider)',
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
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
            }
        }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                margin: '2px 12px',
                '&.Mui-selected': {
                    backgroundColor: `rgba(106, 153, 78, 0.1)`, // استخدام الأخضر الجديد
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