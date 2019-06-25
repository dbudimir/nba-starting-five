import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './Search';
import PlayerCard from './PlayerCard';

const MyPlayerContainer = styled.div`
   display: flex;
`;

class StartingFiveUserSubmit extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchInput: '',
         playerId: '',
         playerArray: [],
      };
   }

   getPlayers = playerArray => {
      this.setState({
         playerArray,
      });
   };

   render() {
      const players = this.state.playerArray;
      const playerCard = players.map((player, index) => <PlayerCard data={player} key={index} />);

      return (
         <div>
            <Search getPlayers={this.getPlayers} />
            <h3>my players</h3>
            <MyPlayerContainer>{playerCard}</MyPlayerContainer>
         </div>
      );
   }
}

export default StartingFiveUserSubmit;
