import React, { Component } from 'react';
import Search from './Search';
import StartingFive from './StartingFive';
import imageURL from '../img-search';

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
            <p>{imageURL}</p>
            <StartingFive />
         </div>
      );
   }
}

export default Body;
