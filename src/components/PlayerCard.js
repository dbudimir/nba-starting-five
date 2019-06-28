import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
   width: 18%;
   min-width: 180px;
   max-width: 200px;
   margin-top: 24px;
   transition: box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;
   .player-name {
      margin: 0 auto;
      display: block;
      width: fit-content;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 12px;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-align: center;
   }
   .player-content {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      .player-image {
         overflow: hidden;
         max-height: 250px;
         img {
            min-width: 100%;
            max-height: 220px;
            margin-left: 50%;
            transform: translateX(-50%);
            overflow: hidden;
            object-fit: cover;
         }
      }
      .career-stats {
         display: block;
         width: fit-content;
         margin: 2px auto 4px;
      }
      .player-stats {
         display: flex;
         justify-content: space-around;
         div {
            font-weight: 900;
            width: fit-content;
            display: flex;
            flex-direction: column;
            text-align: center;
            margin-bottom: 6px;
            .stat-value {
               font-weight: 600;
               letter-spacing: -1px;
            }
         }
      }
   }
   :hover {
      transform: scale(1.02);
   }
   @media (max-width: 768px) {
      min-width: 48%;
   }
`;

class PlayerCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <Card>
            <span className="player-name">{this.props.data.playerName}</span>
            <div className="player-content">
               <div className="player-image">
                  <img
                     src={this.props.data.playerImage}
                     alt={this.props.data.playerName}
                  />
               </div>
               <span className="career-stats">Career Stats</span>
               <div className="player-stats">
                  <div>
                     <span className="stat-type">PPG</span>
                     <span className="stat-value">
                        {this.props.data.careerPPG}
                     </span>
                  </div>
                  <div>
                     <span className="stat-type">RPG</span>
                     <span className="stat-value">
                        {this.props.data.careerRPG}
                     </span>
                  </div>
                  <div>
                     <span className="stat-type">APG</span>
                     <span className="stat-value">
                        {this.props.data.careerAPG}
                     </span>
                  </div>
                  {/* <span>Remove Player</span> */}
               </div>
            </div>
         </Card>
      );
   }
}

export default PlayerCard;
