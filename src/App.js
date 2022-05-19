// import node modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

// import components
import HomePage from './Components/Home';

// import constants
import * as ROUTES from './Constants/routes';


/* *
   * Main entry point of the applications.
   *
   * @author Koh Tong Liang
   * @version 1.0
   * @since 19/10/2020
   * */
function App() {
/* *
   * create a theme to allow usage of dark or light theme depending on user's device preference
   */
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        type: true ? 'dark' : 'light',
      },
    }),
  );

 /* *
    * Different pages are organized into routes for ease of navigation for the users.
    * Router component contains route which are linked to the individual pages packaged
    * as components. Navigation component is loaded here as navigation will remain fixed
    * throughout all pages.
    */
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
        </Routes>
      </Router>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
