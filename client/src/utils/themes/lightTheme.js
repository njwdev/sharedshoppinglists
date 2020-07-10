import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#FF69B4' },
    secondary: { main: '#e7e7e7' },
    background: {
      // default: '#282c34',
      contrastText: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Josefin Sans',
  },
});
