import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3279FD",
    },
    success: {
      main: "#7CD5A6"
    },
    error: {
      main: "#CF3B27"
    },
    info: {
      main: "#0E1D40"
    }
    // warning: {
    //   main: ''
    // },
  },
  typography: {
    body1: {
      fontFamily: 'Poppins',
    },
    button: {
      textTransform: "none",
      height: 55,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#B5BBC6',
        },
        shrink: {
          transform: 'translate(14px, -10px) scale(.7)',
        },
        outlined: {},
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 55
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: '#0E1D40',
          fontWeight: 500,
          fontFamily: 'Poppins, sans-serif',
          borderColor: '#B5BBC6',
        }
      }
    }
  }
});
