import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Navigation/Header';
import Contacts from './components/Contacts/Contacts';
import { ContactsProvider } from './context';
import About from './components/Pages/About';
import EditContact from './components/Contacts/EditContact';
import NotFound from './components/Pages/NotFound';
import Test from './components/Pages/Test';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Josefin Sans',
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ContactsProvider>
        <Router>
          <Fragment>
            <CssBaseline />
            <Header branding="Contact Manager" />
            <Fragment>
              <Switch>
                <Route exact path="/" component={Contacts}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/" component={Contacts}></Route>
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
  );
};

export default App;
