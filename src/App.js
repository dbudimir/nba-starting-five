import React from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import Body from './components/Body';

function App() {
   return (
      <div>
         <Nav logOut={this.handleLogOut} {...this.state} />
         <BodyContainer>
            <Body logIn={this.handleLogIn} />
         </BodyContainer>
      </div>
   );
}

export default App;
