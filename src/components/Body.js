import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Children
import StartingFive from './StartingFive';
import StartingFiveUserSubmit from './StartingFiveUserSubmit';
import UserStartingFive from './UserStartingFive';
import Login from './Login';
import Signup from './Signup';

class Body extends Component {
   constructor(props) {
      super(props);
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

   handleLogIn = (email, password, userId) => {
      this.setState({
         user: {
            email,
            password,
            userId,
            isLoggedIn: true,
         },
      });
      console.log('logging in now');
      localStorage.setItem('userId', userId);
      this.props.logIn(this.state);
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
               <Route
                  path="/users/:id"
                  render={props => (
                     <UserStartingFive {...props} {...this.state} />
                  )}
               />
               <Route
                  path="/"
                  render={props => <StartingFive {...this.state} />}
               />
            </Switch>
         </div>
      );
   }
}

export default Body;
