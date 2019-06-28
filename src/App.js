import React, { Component } from 'react';

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

   setLogIn = bodyState => {
      this.setState({
         user: {
            email: bodyState.user.email,
            password: bodyState.user.password,
            userId: bodyState.user.userId,
            isLoggedIn: true,
         },
      });
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
