import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//Components
import Landing from './components/Landing/Landing';
import Routes from './components/routing/Routes';
import AlertSnackbar from './components/Layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { loadUser } from './store/actions/authActions';
import { getCurrentProfile } from './store/actions/profileActions';
import setAuthToken from './utils/setAuthToken';

import Spinner from './components/Layout/Spinner';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#FF69B4' },
    secondary: { main: '#e7e7e7' },
    background: {
      default: '#282c34',
      contrastText: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Josefin Sans',
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await store.dispatch(loadUser());
      await store.dispatch(getCurrentProfile());
      setLoading(false);
    };
    getData();
  }, []);

  const appLoading = <Spinner />;

  const app = (
    <Switch>
      <Route exact path="/" component={Landing}></Route>
      <Route component={Routes} />
    </Switch>
  );
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AlertSnackbar />
        <Router>
          <>
            <CssBaseline />
            <>{loading ? appLoading : app}</>
          </>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
