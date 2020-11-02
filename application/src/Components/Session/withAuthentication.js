// import React from 'react';
 
// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';
 
//  /* *
//     * 
//     * Higher-order-component to allow child components to access auth user context
//     * to determine if user is authenticated
//     * 
//     * @Koh Tong Liang
//     * @Version 1.0
//     * @Since 19/10/2018
//     * */
// const withAuthentication = Component => {
//   class WithAuthentication extends React.Component {
//     constructor(props) {
//       super(props);
 
//       this.state = {
//         authUser: null,
//       };
//     }
 
//     componentDidMount() {
//       this.listener = this.props.firebase.onAuthUserListener(
//         authUser => {
//           this.setState({ authUser });
//         },
//         () => {
//           this.setState({ authUser: null });
//         },
//       );
//     }
 
//     componentWillUnmount() {
//       this.listener();
//     }
 
//     render() {
//       return (
//         <AuthUserContext.Provider value={this.state.authUser}>
//           <Component {...this.props} />
//         </AuthUserContext.Provider>
//       );
//     }
//   }
 
//   return withFirebase(WithAuthentication);
// };
 
// export default withAuthentication;