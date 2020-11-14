// import node modules
import React from 'react';
import { connect } from 'react-redux';

// import redux components
import { signOut } from '../../Action/FirebaseAction';

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}




/**
 * Sign out page to allow user to exit from current authenticated session
 * 
 * @author Jeremiah
 * @version 1.0
 * @since 19/10/2020
 */
const SignOutView = (props) => (
  <div onClick={() => props.signOut()}>
    Sign Out
  </div>
);

// bridge the view to redux actions and store
const SignOutButton = connect(
  null,
  mapDispatchToProps,
)(SignOutView);

export default SignOutButton;