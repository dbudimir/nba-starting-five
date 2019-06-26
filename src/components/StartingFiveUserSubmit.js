import React, { Component } from 'react';
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
         startingFiveName: '',
         searchInput: '',
         playerId: '',
         playerArray: [],
         user: {
            loggedIn: this.props.user.isLoggedIn,
            lineupNamed: false,
            lineupFull: false,
         },
      };
   }

   getPlayers = playerArray => {
      this.setState({
         playerArray,
      });
   };

   updateLineUpName = e => {
      this.setState({
         startingFiveName: e.target.value,
      });
   };

   submitLineUpName = e => {
      this.setState({
         user: {
            lineupNamed: true,
         },
      });
   };

   render() {
      console.log(this.state);
      const players = this.state.playerArray;
      const playerCard = players.map((player, index) => <PlayerCard data={player} key={index} />);

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
      } else if (this.state.user.lineupNamed === false && this.props.user.isLoggedIn === true) {
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
         startingFiveSubmit = (
            <div>
               <Search getPlayers={this.getPlayers} />
               <h3>My players</h3>
               <MyPlayerContainer>{playerCard}</MyPlayerContainer>
            </div>
         );
      }

      return <div>{startingFiveSubmit}</div>;
   }
}

export default StartingFiveUserSubmit;
