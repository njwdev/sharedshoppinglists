import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Theme
import CssBaseline from '@material-ui/core/CssBaseline';
//Components
import Landing from './components/Landing/Landing';
import Routes from './components/routing/Routes';
import AlertSnackbar from './components/Layout/Alert';
import NotFound from './components/Pages/NotFound';
//Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { loadUser } from './store/actions/authActions';
import { getCurrentProfile } from './store/actions/profileActions';
import setAuthToken from './utils/setAuthToken';
import Spinner from './components/Layout/Spinner';
import AppThemeWrapper from './utils/AppThemeWrapper';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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
      <Route exact path='/' component={Landing}></Route>
      <Route component={NotFound} path='/notfound' />
      <Route component={Routes} />
    </Switch>
  );
  return (
    <Provider store={store}>
      <AppThemeWrapper>
        <AlertSnackbar />
        <Router>
          <>
            <CssBaseline />
            <>{loading ? appLoading : app}</>
          </>
        </Router>
      </AppThemeWrapper>
    </Provider>
  );
};

export default App;
