import React from 'react';

import Navigation from './Components/Boundary/Navigation';
import HomePage from './Components/Boundary/Home';
import SignInPage from './Components/Boundary/Authentication/SignIn';
import SignUpPage from './Components/Boundary/Authentication/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './Components/Entity/Session';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

import * as ROUTES from './Constants/routes';


/* *
 * 
 * Main entry point of the applications.
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 19/10/2018
 * */
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

/* *
  * 
  * Main entry point of the applications.
  * 
  * @Koh Tong Liang
  * @Version 1.0
  * @Since 19/10/2018
  * */
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
