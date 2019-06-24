import React, { Component } from 'react';
import Search from './Search';
import StartingFive from './StartingFive';

class Body extends Component {
   constructor() {
      super();
      this.state = {
         searchInput: '',
         playerId: '',
      };
   }

   render() {
      return (
         <div>
            <Search />
            <p>test</p>
            <StartingFive />
         </div>
      );
   }
}

export default Body;
