import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Spinner from '../components/Layout/Spinner';

const AppThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    const getPaletteType = async () => {
      if (user && user.profile.darkMode === true) await setTheme(darkTheme);
      if (user && user.profile.darkMode === false) await setTheme(lightTheme);
      if (!user && prefersDarkMode) await setTheme(darkTheme);
      if (!user && !prefersDarkMode) await setTheme(lightTheme);
    };
    getPaletteType();
    setLoading(false);
  }, [user, prefersDarkMode]);

  return loading ? (
    <Spinner />
  ) : (
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  );
};

export default AppThemeWrapper;
