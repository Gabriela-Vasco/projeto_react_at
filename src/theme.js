import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#F2F2FF',
      main: '#E6E6FA',
      dark: '#B3B3C7',
      contrastText: '#2E2E5F',
    },
    secondary: {
      light: '#A8DADC',
      main: '#8E83CC',
      dark: '#1D3557',
      contrastText: '#fff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#A39ECF',
      main: '#8E83CC',
      dark: '#6C669F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#A8DADC',
      main: '#F2F2FF',
      dark: '#1D3557',
      contrastText: '#FFFFFF',
    },
  },
});

export {
    lightTheme,
    darkTheme
}