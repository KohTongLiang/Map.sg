import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../../Constants/routes';
import AuthUserContext from './context';


 /* *
    * 
    * Higher-order-component to allow child components to access auth user context
    * to determine if user is authenticated
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
const withAuthorization = condition => Component => {
    class WithAuthorization  extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
              authUser => {
                if (!condition(authUser)) {
                  this.props.history.push(ROUTES.HOME);
                }
              },
              () => this.props.history.push(ROUTES.SIGN_IN),
            );
          }

        componentWillUnmount () {
            this.listener();
        }

        render () {
            return(
                <AuthUserContext.Consumer>
                    { authUser => condition(authUser) ? <Component {...this.props} uid={authUser.uid} /> : null }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withFirebase(withRouter(WithAuthorization ));
}

export default withAuthorization;