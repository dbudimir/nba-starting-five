import React, { Component } from 'react';
import axios from 'axios';

class StartingFive extends Component {
   constructor() {
      super();
      this.state = {
         startingFives: [],
      };
   }

   componentDidMount() {
      axios
         .get(`http://localhost:8080/api/startingfive/`)
         .then(res => {
            console.log(res.data);
            this.setState({
               startingFives: res.data,
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      const { startingFives } = this.state;
      const startingFiveContaier = startingFives.map(startingFive => {
         console.log(startingFive.players);
         return <p>{startingFive.name}</p>;
      });
      return (
         <div>
            <h3>all top fives</h3>
            {startingFiveContaier}
         </div>
      );
   }
}

export default StartingFive;
