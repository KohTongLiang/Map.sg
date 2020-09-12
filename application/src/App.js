import React from 'react';

import Navigation from './Components/Navigation';
import HomePage from './Components/Home';
import SignInPage from './Components/Authentication/SignIn';
import SignUpPage from './Components/Authentication/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './Components/Session';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

import * as ROUTES from './Constants/routes';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: true ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation/>
        <Route exact path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
      </Router>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default withAuthentication(App);
