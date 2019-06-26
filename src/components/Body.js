import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Children
import StartingFive from './StartingFive';
import StartingFiveUserSubmit from './StartingFiveUserSubmit';
import Login from './Login';
import Signup from './Signup';

class Body extends Component {
   constructor() {
      super();
      this.state = {
         searchInput: '',
         playerId: '',
         playerArray: [],
      };
   }

   render() {
      return (
         <div>
            <Switch>
               <Route path="/login" render={props => <Login {...this.state} />} />
               <Route path="/signup" render={props => <Signup {...this.state} />} />
               <Route
                  path="/create-lineup"
                  render={props => <StartingFiveUserSubmit {...this.state} />}
               />
               <Route path="/" render={props => <StartingFive {...this.state} />} />
            </Switch>
         </div>
      );
   }
}

export default Body;
