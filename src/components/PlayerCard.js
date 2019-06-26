import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
   border: 1px solid #000000;
   max-width: 18%;
   .player-image {
      overflow: hidden;
      max-height: 250px;
   }
   img {
      height: 250px;
      margin-left: 50%;
      transform: translateX(-50%);
   }
`;

class PlayerCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      console.log(this.props.data.playerImage);
      return (
         <Card>
            <div className="player-image">
               <img src={this.props.data.playerImage} alt={this.props.data.playerName} />
            </div>
            <span>{this.props.data.playerName}</span>
            <span>Career Stats</span>
            <div>
               <div>
                  <span className="stat-type">PPG</span>
                  <span className="stat-value">{this.props.data.careerPPG}</span>
               </div>
               <div>
                  <span className="stat-type">RPG</span>
                  <span className="stat-value">{this.props.data.careerRPG}</span>
               </div>
               <div>
                  <span className="stat-type">APG</span>
                  <span className="stat-value">{this.props.data.careerAPG}</span>
               </div>
            </div>
         </Card>
      );
   }
}

export default PlayerCard;
