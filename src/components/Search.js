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

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         ...this.state,
         [name]: value,
      });
   };

   // testAxios = () => {
   //    console.log('testAxios start');
   //    axios
   //       .get(
   //          `https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=00`
   //       )
   //       .then(res => {
   //          console.log('do we have a response...');
   //          console.log(res.data);
   //       });
   // };

   getPlayersFromDB = newPlayer => {
      axios
         .get('https://nba-starting-five.herokuapp.com/api/players/')
         .then(res => {
            this.setState({
               playerDataBase: res.data,
            });
         })
         .then(() => {
            if (newPlayer === 'newplayer') {
               console.log('getting new player');
               this.getPlayer();
            }
         });
   };

   componentDidMount() {
      this.getPlayersFromDB();
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

   getPlayer = () => {
      console.log('getting player');
      const playerDataBaseList = this.state.playerDataBase;
      const publicPlayerList = this.state.playerList;
      const playerInDB = playerDataBaseList.filter(player => {
         if (
            changeCase.lowerCase(player.playerName) === changeCase.lowerCase(this.state.searchInput)
         ) {
            console.log(player);
            this.updatePlayerArray(player);
            return player;
         }
      });

      if (playerInDB.length === 0) {
         publicPlayerList.filter(player => {
            if (
               changeCase.lowerCase(player.playerFullNameLowerCase) ===
               changeCase.lowerCase(this.state.searchInput)
            ) {
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
                           const playerStats = {
                              playerID: res.data.resultSets[1].rowSet[0][0],
                              playerName: res.data.resultSets[1].rowSet[0][1],
                              careerPPG: res.data.resultSets[1].rowSet[0][3],
                              careerAPG: res.data.resultSets[1].rowSet[0][4],
                              careerRPG: res.data.resultSets[1].rowSet[0][5],
                              yearsActive: res.data.resultSets[0].rowSet[0][12],
                              playerImage: searchResponse.value[0].contentUrl,
                           };
                           axios
                              .post(
                                 'https://nba-starting-five.herokuapp.com/api/players/new',
                                 playerStats
                              )
                              .then(() => {
                                 this.getPlayersFromDB('newplayer');
                              });
                        }.bind(this)
                     );
                  });
            }
         });
      }
   };

   updatePlayerArray = playerStats => {
      this.setState(
         {
            lineup: [playerStats, ...this.state.lineup],
         },
         () => {
            if (this.state.lineup.length >= 6) {
               alert('Please only select five players');
            } else {
               this.props.getPlayers(this.state.lineup);
               // This is where we'll pass information to the API
            }
         }
      );
   };

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
