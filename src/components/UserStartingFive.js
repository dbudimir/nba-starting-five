import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import StartingFiveContainer from './StartingFiveContainer';

const Container = styled.div`
   max-width: 80%;
   width: 1024px;
   margin: 0 auto;
   .profile-header {
      text-align: center;
      h2 {
         margin-top: 120px;
      }
   }
`;

class UserStartingFive extends Component {
   constructor() {
      super();
      this.state = {
         startingFives: [],
      };
   }

   componentDidMount() {
      const thisUser = localStorage.userId;
      axios
         .get(
            `https://nba-starting-five.herokuapp.com/api/users/id/${thisUser}`
         )
         .then(res => {
            console.log(res.data[0].starting_five);
            this.setState({
               startingFives: res.data[0].starting_five,
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      const { startingFives } = this.state;
      const userStartingFiveContainer = startingFives.map(
         (startingFive, index) => (
            <StartingFiveContainer data={startingFive} key={index} />
         )
      );

      let userProfile;
      if (this.state.startingFives.length === 0) {
         userProfile = (
            <Container>
               <Link to="/create-lineup" className="profile-header">
                  <h2>Click here to add your first lineup.</h2>
               </Link>
            </Container>
         );
      } else {
         userProfile = <Container>{userStartingFiveContainer}</Container>;
      }

      return <div>{userProfile}</div>;
   }
}

export default UserStartingFive;
