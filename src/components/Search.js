import request from 'request';
import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
   constructor() {
      super();
      this.state = {
         searchInput: '',
         currentPlayerId: '',
         currentPlayerImage: '',
         currentPlayerObject: {},
         topFive: [],
         playerList: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            `https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=00`
         )
         .then(res => {
            const players = res.data.resultSets[0].rowSet;
            const allPlayers = [];
            players.forEach(player => {
               allPlayers.push({
                  playerID: player[0],
                  playerFullName: player[2],
                  playerFullNameLowerCase: player[2].toLowerCase(),
               });
               this.setState({
                  playerList: allPlayers,
               });
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         ...this.state,
         [name]: value,
      });
   };

   getPlayerID = e => {
      e.preventDefault();
      const playerResult = this.state.playerList;
      playerResult.filter(player => {
         if (player.playerFullNameLowerCase === this.state.searchInput) {
            const subscriptionKey = '31c5082e88ae4447a14da37ba0e6efbc';
            const searchTerm = player.playerFullNameLowerCase;
            const info = {
               url: `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="${searchTerm}"`,
               headers: {
                  'Ocp-Apim-Subscription-Key': subscriptionKey,
               },
            };
            axios
               .get(
                  `https://stats.nba.com/stats/commonplayerinfo/?PlayerId=${player.playerID}&SeasonType=Regular+Season&LeagueId=00`
               )
               .then(res => {
                  request(
                     info,
                     function(error, response, body) {
                        const searchResponse = JSON.parse(body);
                        this.setState({
                           topFive: [
                              {
                                 playerID: res.data.resultSets[1].rowSet[0][0],
                                 playerName: res.data.resultSets[1].rowSet[0][1],
                                 careerPPG: res.data.resultSets[1].rowSet[0][3],
                                 careerAPG: res.data.resultSets[1].rowSet[0][4],
                                 careerRPG: res.data.resultSets[1].rowSet[0][5],
                                 yearsActive: res.data.resultSets[0].rowSet[0][12],
                                 playerImage: searchResponse.value[0].contentUrl,
                              },
                              ...this.state.topFive,
                           ],
                        });
                        console.log(this.state.topFive[0]);
                        console.log(this.state.topFive);
                        axios.post(
                           'https://nba-starting-five.herokuapp.com/api/players/new',
                           this.state.topFive[0]
                        );
                        this.props.getPlayers(this.state.topFive);
                        // This is where we'll pass information to the API
                     }.bind(this)
                  );
               });
         }
      });
   };

   render() {
      // this.props.getPlayers({ playerID: "test" });
      return (
         <div>
            <p>Search for a player</p>
            <input onChange={this.updateState} className="text-input" name="searchInput" />
            <button onClick={this.getPlayerID} type="button">
               get players
            </button>
         </div>
      );
   }
}

export default Search;
