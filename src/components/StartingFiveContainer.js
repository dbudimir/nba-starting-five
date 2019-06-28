import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
      @media (max-width: 1024px) {
         font-size: 28px;
         font-weight: 800;
         margin-bottom: 12px;
         margin-left: 0px;
      }
   }
   a {
      text-decoration: none;
   }
`;

const LineUpContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`;

class StartingFiveContainer extends Component {
   constructor() {
      super();
      this.state = {
         users: [],
      };
   }

   componentDidMount() {
      axios
         .get(`https://nba-starting-five.herokuapp.com/api/users/`)
         .then(res => {
            this.setState({
               users: res.data,
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      const userStartingFive = this.state.users.map(user =>
         user.starting_five.map(thisFive => {
            if (thisFive._id === this.props.data._id) {
               return (
                  <span>
                     Posted by:
                     <Link to={`/users/${user._id}`}> {user.full_name}</Link>
                  </span>
               );
            }
         })
      );

      const lineup = this.props.data.players;
      const playersLineup = lineup.map((lineup, index) => (
         <PlayerCard data={lineup} key={index} />
      ));

      return (
         <Outer className="lineup-outer">
            <h3>{this.props.data.name}</h3>
            {userStartingFive}
            <LineUpContainer className="lineup-container">
               {playersLineup}
            </LineUpContainer>
         </Outer>
      );
   }
}

export default StartingFiveContainer;
