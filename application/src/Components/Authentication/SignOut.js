import React from 'react';
import { connect } from 'react-redux';
 
import { signOut } from '../../Action/FirebaseAction';

function mapDispatchToProps (dispatch) {
    return {
        signOut: () => dispatch(signOut()),
    }
}

const SignOutView = (props) => (
  <div onClick={() => props.signOut()}>
    Sign Out
  </div>

);

const SignOutButton = connect(
    null,
    mapDispatchToProps,
    )(SignOutView);

export default SignOutButton;