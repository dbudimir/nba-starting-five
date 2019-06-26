import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Children
import StartingFive from './StartingFive';
import StartingFiveUserSubmit from './StartingFiveUserSubmit';
import Login from './Login';
import Signup from './Signup';

const LogOut = styled.div`
   position: absolute;
   bottom: 0;
   right: 0;
   padding: 12px 24px;
`;

class Body extends Component {
   constructor() {
      super();
      this.state = {
         user: {
            email: '',
            password: '',
            userId: '',
            isLoggedIn: false,
         },
         startingFive: {
            name: '',
            playerArray: [],
         },
      };
   }

   handleLogIn = (email, password, userId, status) => {
      console.log('logging in now');
      this.setState({
         user: {
            email,
            password,
            userId,
            isLoggedIn: status,
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
            <Switch>
               <Route
                  path="/login"
                  render={props => (
                     <Login
                        {...props}
                        {...this.state}
                        logOut={this.handleLogOut}
                        logIn={this.handleLogIn}
                     />
                  )}
               />
               <Route
                  path="/signup"
                  render={props => (
                     <Signup
                        {...props}
                        {...this.state}
                        logOut={this.handleLogOut}
                        logIn={this.handleLogIn}
                     />
                  )}
               />
               <Route
                  path="/create-lineup"
                  render={props => (
                     <StartingFiveUserSubmit
                        {...props}
                        {...this.state}
                        logOut={this.handleLogOut}
                        logIn={this.handleLogIn}
                     />
                  )}
               />
               <Route path="/" render={props => <StartingFive {...this.state} />} />
            </Switch>
            <LogOut>
               <span onClick={this.handleLogOut}>LogOut</span>
            </LogOut>
         </div>
      );
   }
}

export default Body;
