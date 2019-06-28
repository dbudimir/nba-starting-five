import React, { Component } from 'react';

import Nav from './components/Nav';
import Body from './components/Body';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {},
      };
   }

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
               <Body {...this.state} />
            </div>
         </div>
      );
   }
}

export default App;
