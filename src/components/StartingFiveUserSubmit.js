import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

// Children
import Search from './Search';
import PlayerCard from './PlayerCard';
import Login from './Login';

const SubmitContainer = styled.div`
   margin: 60px auto 0;
   max-width: 1024px;
   text-align: center;
   .lineup-info {
      h3 {
         margin-bottom: 64px;
      }
      .label {
         margin-top: 12px;
         font-weight: 800;
      }
      input {
         width: 500px;
         height: 48px;
         border: 0px;
         border-bottom: 3px solid #000000;
         font-size: 32px;
         margin-bottom: 64px;
         padding: 0 4px;
      }
      input::placeholder {
         font-size: 32px;
         padding: 6px 6px 0;
      }
      .player-card-contaier {
         display: flex;
         justify-content: space-evenly;
         margin-top: -18px;
         margin-bottom: 92px;
      }
      .submit-button {
         border-radius: 6px;
         border-bottom: none;
         line-height: 0;
         font-size: 24px;
         font-weight: 800;
         background-color: #fa8320;
         width: 200px;
         padding: 6px 24px;
      }
      .search-submit-button {
         margin-left: 12px;
      }
   }
`;

class StartingFiveUserSubmit extends Component {
   constructor(props) {
      super(props);
      this.state = {
         lineup: {
            name: '',
            players: [],
         },
         user: {
            loggedIn: this.props.user.isLoggedIn,
            lineupNamed: false,
            lineupFull: false,
            userId: localStorage.userId,
         },
      };
   }

   getPlayers = playerArray => {
      this.setState({
         lineup: {
            name: this.state.lineup.name,
            players: playerArray,
         },
         user: {
            loggedIn: this.state.user.loggedIn,
            lineupNamed: this.state.user.lineupNamed,
            lineupFull: this.state.user.lineupFull,
            userId: localStorage.userId,
         },
      });
   };

   updateLineUpName = e => {
      this.setState({
         lineup: {
            name: e.target.value,
            players: this.state.lineup.players,
         },
      });
   };

   submitLineUpName = () => {
      this.setState({
         user: {
            loggedIn: this.props.user.isLoggedIn,
            lineupNamed: true,
            lineupFull: this.state.lineupFull,
            userId: localStorage.userId,
         },
      });
   };

   submitLineUp = () => {
      if (this.state.lineup.players.length < 5) {
         alert('Add five players to your lineup');
      } else {
         axios
            .post(
               'https://nba-starting-five.herokuapp.com/api/startingfive/new',
               this.state
            )
            .then(() => {
               this.props.history.push(`/users/${this.state.user.userId}`);
            });
      }
   };

   render() {
      let startingFiveSubmit;
      if (localStorage.length === 0) {
         startingFiveSubmit = (
            <div key="1">
               <Login
                  {...this.props}
                  {...this.state}
                  logOut={this.props.logOut}
                  logIn={this.props.logIn}
               />
            </div>
         );
      } else if (
         localStorage.length > 0 &&
         this.state.user.lineupNamed === false
      ) {
         startingFiveSubmit = (
            <div className="lineup-info" key="2">
               <h3>Enter a name for your lineup</h3>
               <input
                  onChange={this.updateLineUpName}
                  className="text-input"
                  name="name"
                  placeholder="ex. The Dunk Kings"
               />
               <div onClick={this.submitLineUpName}>
                  <span className="submit-button">Next</span>
               </div>
            </div>
         );
      } else if (this.state.user.lineupNamed === true) {
         const { players } = this.state.lineup;
         const playerCard = players.map((player, index) => (
            <PlayerCard data={player} key={index} />
         ));
         startingFiveSubmit = (
            <div className="lineup-info" key="3">
               <Search
                  getPlayers={this.getPlayers}
                  lineupName={this.state.lineup.name}
               />
               <div className="player-card-contaier">{playerCard}</div>
               <span onClick={this.submitLineUp} className="submit-button">
                  Submit Lineup
               </span>
            </div>
         );
      }

      return (
         <SubmitContainer className="submit-container">
            {startingFiveSubmit}
         </SubmitContainer>
      );
   }
}

export default StartingFiveUserSubmit;
