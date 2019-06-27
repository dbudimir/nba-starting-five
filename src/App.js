import React, { Component } from 'react';

import Nav from './components/Nav';
import Body from './components/Body';

class App extends Component {
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
            <Nav logOut={this.handleLogOut} />
            <div>
               <Body />
            </div>
         </div>
      );
   }
}

export default App;
