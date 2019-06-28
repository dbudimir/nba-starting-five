import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Nav from './components/Nav';
import Body from './components/Body';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {
            email: '',
            password: '',
            userId: '',
            isLoggedIn: false,
         },
      };
   }

   setLogIn = (bodyState, loginPath) => {
      this.setState({
         user: {
            email: bodyState.user.email,
            password: bodyState.user.password,
            userId: bodyState.user.userId,
            isLoggedIn: true,
         },
      });
      if (loginPath === '/login') {
         console.log('doing this');
         console.log(bodyState.user.userId);

         return <Redirect push to={`/user/${bodyState.user.userId}`} />;
      }
   };

   handleLogOut = () => {
      console.log('logging out now');
      this.setState({
         user: {
            email: '',
            password: '',
            userId: '',
            isLoggedIn: false,
         },
      });
      localStorage.clear();
   };

   render() {
      return (
         <div>
            <Nav
               logOut={this.handleLogOut}
               isLoggedIn={this.state.user.isLoggedIn}
               userId={this.state.user.userId}
            />
            <div>
               <Body {...this.props} {...this.state} logIn={this.setLogIn} />
            </div>
         </div>
      );
   }
}

export default App;
