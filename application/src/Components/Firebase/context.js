import React from 'react';

const FirebaseContext = React.createContext(null);

/* *
* 
* Firebase higher-order-component to child components to access firebase
* functions
* 
* @Koh Tong Liang
* @Version 1.0
* @Since 19/10/2018
* */
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;