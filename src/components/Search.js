import request from 'request';
import React, { Component } from 'react';
import axios from 'axios';
import changeCase from 'change-case';

class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchInput: '',
         currentPlayerId: '',
         currentPlayerImage: '',
         currentPlayerObject: {},
         playerID: '',
         playerFullName: '',
         playerFullNameLowerCase: '',
         lineup: [],
         playerList: [],
      };
   }

   componentDidMount() {
      axios.get('https://nba-starting-five.herokuapp.com/api/players/').then(res => {
         console.log(res.data);
         this.setState({
            playerDataBase: res.data,
         });
      });
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
            });
            this.setState({
               playerList: allPlayers,
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

   getPlayer = e => {
      e.preventDefault();
      const playerDataBaseList = this.state.playerDataBase;
      const publicPlayerList = this.state.playerList;

      const playerInDB = playerDataBaseList.filter(player => {
         if (
            changeCase.lowerCase(player.playerName) === changeCase.lowerCase(this.state.searchInput)
         ) {
            return player;
         }
      });

      console.log(playerInDB);

      publicPlayerList.filter(player => {
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
                           lineup: [
                              {
                                 playerID: res.data.resultSets[1].rowSet[0][0],
                                 playerName: res.data.resultSets[1].rowSet[0][1],
                                 careerPPG: res.data.resultSets[1].rowSet[0][3],
                                 careerAPG: res.data.resultSets[1].rowSet[0][4],
                                 careerRPG: res.data.resultSets[1].rowSet[0][5],
                                 yearsActive: res.data.resultSets[0].rowSet[0][12],
                                 playerImage: searchResponse.value[0].contentUrl,
                              },
                              ...this.state.lineup,
                           ],
                        });
                        console.log(this.state.lineup[0]);
                        console.log(this.state.lineup);
                        axios.post(
                           'https://nba-starting-five.herokuapp.com/api/players/new',
                           this.state.lineup[0]
                        );
                        this.props.getPlayers(this.state.lineup);
                        // This is where we'll pass information to the API
                     }.bind(this)
                  );
               });
         }
      });
   };

   updatePlayerArray = {};

   render() {
      return (
         <div>
            <p>Search for a player</p>
            <input onChange={this.updateState} className="text-input" name="searchInput" />
            <button onClick={this.getPlayer} type="button">
               get players
            </button>
         </div>
      );
   }
}

export default Search;
