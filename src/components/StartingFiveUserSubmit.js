import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Children
import Search from './Search';
import PlayerCard from './PlayerCard';
import Login from './Login';

const SubmitContainer = styled.div`
   margin: 0 auto;
   max-width: 1024px;
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
         alert('add five players to your lineup');
      } else {
         console.log(this.state);
         axios.post('https://nba-starting-five.herokuapp.com/api/startingfive/new', this.state);
      }
   };

   render() {
      let startingFiveSubmit;
      if (localStorage.length === 0) {
         startingFiveSubmit = (
            <div>
               <Login
                  {...this.props}
                  {...this.state}
                  logOut={this.props.logOut}
                  logIn={this.props.logIn}
               />
            </div>
         );
      } else if (localStorage.length > 0 && this.state.user.lineupNamed === false) {
         startingFiveSubmit = (
            <div>
               <h3>Enter a name for your lineup</h3>
               <input onChange={this.updateLineUpName} className="text-input" name="name" />
               <div onClick={this.submitLineUpName}>
                  <span>Next</span>
               </div>
            </div>
         );
      } else if (this.state.user.lineupNamed === true) {
         const { players } = this.state.lineup;
         const playerCard = players.map((player, index) => (
            <PlayerCard data={player} key={index} />
         ));
         startingFiveSubmit = (
            <div>
               <Search getPlayers={this.getPlayers} />
               <h3>My players</h3>
               <div>{playerCard}</div>
               <span onClick={this.submitLineUp}>Submit Lineup</span>
            </div>
         );
      }

      return <SubmitContainer>{startingFiveSubmit}</SubmitContainer>;
   }
}

export default StartingFiveUserSubmit;
