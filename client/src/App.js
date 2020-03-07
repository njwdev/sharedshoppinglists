import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Navigation/Header';
import Contacts from './components/Contacts/Contacts';
import Lists from './components/Lists/Lists';
import { ContactsProvider } from './context';
import About from './components/Pages/About';
import EditContact from './components/Contacts/EditContact';
import NotFound from './components/Pages/NotFound';
import Test from './components/Pages/Test';
import { Provider } from 'react-redux';
import store from './store/index';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Josefin Sans',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ContactsProvider>
          <Router>
            <Fragment>
              <CssBaseline />
              <Header branding="Shared Shopping Lists" />
              <Fragment>
                <Switch>
                  <Route exact path="/" component={Contacts}></Route>
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
        </ContactsProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
