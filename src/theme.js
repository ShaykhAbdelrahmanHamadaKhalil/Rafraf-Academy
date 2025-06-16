// src/theme.js
import { createTheme } from '@mui/material/styles';

const PALETTE = {
    primary: '#5a8a38', 
    secondary: '#03A9F4',
};

export const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    primary: {
      main: PALETTE.primary,
    },
    secondary: {
      main: PALETTE.secondary,
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#F4F6F8',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#343A40',
            secondary: '#6C757D',
          },
        }
      : {
          background: {
            default: '#161C24',
            paper: '#212B36',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
          },
        }),
  },
  typography: {
    fontFamily: ['Cairo', 'Public Sans', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h4: { fontWeight: 700, fontSize: '2rem' },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                borderRadius: '16px',
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                fontWeight: 600,
            }
        }
    }
  },
});