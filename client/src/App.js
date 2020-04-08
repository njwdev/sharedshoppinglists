import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//Components
import Header from './components/Navigation/Header';
import Contacts from './components/Contacts/Contacts';
import Lists from './components/Lists/Lists';
import Landing from './components/Landing/Landing';
import About from './components/Pages/About';
import EditContact from './components/Contacts/EditContact';
import NotFound from './components/Pages/NotFound';
import Test from './components/Pages/Test';
import AlertSnackbar from './components/Layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { loadUser } from './store/actions/authActions';
import setAuthToken from './utils/setAuthToken';

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
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AlertSnackbar />
        <Router>
          <Fragment>
            <CssBaseline />
            <Fragment>
              <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Header branding="Shared Shopping Lists" />
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/lists" component={Lists}></Route>
                <Route
                  exact
                  path="/editcontact/:id"
                  component={EditContact}
                ></Route>
                <Route exact path="/test" component={Test}></Route>
                <Route path="*" component={NotFound}></Route>
              </Switch>
            </Fragment>
          </Fragment>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
