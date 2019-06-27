import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Children
import Search from './Search';
import PlayerCard from './PlayerCard';
import Login from './Login';

const MyPlayerContainer = styled.div`
   display: flex;
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
            userId: this.props.userId,
         },
      };
   }

   getPlayers = playerArray => {
      this.setState({
         lineup: {
            startingFiveName: this.state.lineup.startingFiveName,
            players: playerArray,
         },
      });
   };

   updateLineUpName = e => {
      this.setState({
         startingFiveName: e.target.value,
      });
   };

   submitLineUpName = () => {
      this.setState({
         user: {
            loggedIn: this.props.user.isLoggedIn,
            lineupNamed: true,
            lineupFull: this.state.lineupFull,
            userId: this.state.userId,
         },
      });
   };

   submitLineUp = () => {
      console.log(this.props);
      console.log(this.state.players);
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
               <input
                  onChange={this.updateLineUpName}
                  className="text-input"
                  name="startingFiveName"
               />
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
               <MyPlayerContainer>{playerCard}</MyPlayerContainer>
               <span onClick={this.submitLineUp}>Submit Lineup</span>
            </div>
         );
      }

      return <div>{startingFiveSubmit}</div>;
   }
}

export default StartingFiveUserSubmit;
