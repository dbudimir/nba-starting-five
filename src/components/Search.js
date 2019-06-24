import React, { Component } from 'react';
import axios from 'axios';
import nba from 'nba.js';

class Search extends Component {
   constructor() {
      super();
      this.state = {
         searchInput: '',
         playerId: '',
      };
   }

   componentDidMount() {
      axios
         .get(
            `https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=2017-18`
         )
         .then(res => {
            console.log(res.data.resultSets[0].rowSet);
            // this.setState({
            //     res.data[0].orders,
            // });
         })
         .catch(err => {
            console.log(err);
         });
   }

   // getPlayers = () => {
   //    nba.stats
   //       .allPlayers({ IsOnlyCurrentSeason: 0 })
   //       .then(res => console.log(res))
   //       .catch(err => console.error(err));
   // };

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         ...this.state.order,
         [name]: value,
      });
   };

   render() {
      return (
         <div>
            <p>Search for a player</p>
            <input
               onChange={this.updateState}
               className="text-input"
               name="searchInput"
            />
            <button onClick={this.getPlayers} type="button">
               get players
            </button>
         </div>
      );
   }
}

export default Search;
