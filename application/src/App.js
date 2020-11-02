import React from 'react';
import HomePage from './Components/Home';
import SignInPage from './Components/Authentication/SignIn';
import SignUpPage from './Components/Authentication/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

import * as ROUTES from './Constants/routes';


/* *
 * 
 * Main entry point of the applications.
 * 
 * @Koh Tong Liang
 * @Version 1.0
 * @Since 19/10/2020
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
    // [prefersDarkMode],
  );

/* *
  * 
  * Different pages are organized into routes for ease of navigation for the users.
  * Router component contains route which are linked to the individual pages packaged
  * as components. Navigation component is loaded here as navigation will remain fixed
  * throughout all pages.
  * 
  * @Koh Tong Liang
  * @Version 1.0
  * @Since 19/10/2018
  * */
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
      </Router>
      <CssBaseline />
    </ThemeProvider>
  );
}

// export default withAuthentication(App);
export default App;
