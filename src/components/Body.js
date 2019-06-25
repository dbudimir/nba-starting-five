import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartingFive from './StartingFive';
import StartingFiveUserSubmit from './StartingFiveUserSubmit';

class Body extends Component {
   constructor() {
      super();
      this.state = {
         searchInput: '',
         playerId: '',
         playerArray: [],
      };
   }

   // getPlayers = playerArray => {
   //    this.setState({
   //       playerArray,
   //    });
   // };

   render() {
      return (
         <div>
            <Switch>
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
