import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import StartingFiveContainer from './StartingFiveContainer';

const Container = styled.div`
   width: 96%;
   max-width: 1200px;
   margin: 0 auto;
`;

class StartingFive extends Component {
   constructor() {
      super();
      this.state = {
         startingFives: [],
      };
   }

   componentDidMount() {
      axios
         .get(`https://nba-starting-five.herokuapp.com/api/startingfive/`)
         .then(res => {
            this.setState({
               startingFives: res.data,
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   render() {
      const { startingFives } = this.state;
      const startingFiveContainer = startingFives.map((startingFive, index) => (
         <StartingFiveContainer data={startingFive} key={index} />
      ));
      return (
         <div>
            <Container>{startingFiveContainer}</Container>
         </div>
      );
   }
}

export default StartingFive;
