import React, { Component } from 'react';
import styled from 'styled-components';

import PlayerCard from './PlayerCard';

const Outer = styled.div`
   padding: 0 12px;
   border-radius: 12px;
   margin-bottom: 42px;
   h3 {
      font-size: 62px;
      font-weight: 800;
      margin-bottom: 12px;
      margin-left: -42px;
   }
`;

const LineUpConatainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`;

class StartingFiveContainer extends Component {
   render() {
      const lineup = this.props.data.players;
      const lineupContainer = lineup.map(lineup => <PlayerCard data={lineup} />);

      return (
         <Outer className="lineup-outer">
            <h3>{this.props.data.name}</h3>
            <LineUpConatainer className="lineup-container">{lineupContainer}</LineUpConatainer>
         </Outer>
      );
   }
}

export default StartingFiveContainer;
