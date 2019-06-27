import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
   background: #000000;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: #ffffff;
   max-width: 100%;
   padding: 0px 24px;
   a {
      text-decoration: none;
      color: #ffffff;
   }
   h1 {
      color: #ffffff;
      text-decoration: none;
   }
   div {
      display: flex;
      span {
         margin-left: 24px;
         font-size: 18px;
      }
   }
`;

class Nav extends Component {
   render() {
      return (
         <NavBar>
            <Link to="/">
               <h1>Starting Five</h1>
            </Link>
            <div>
               <Link to="/login">
                  <span>Log In</span>
               </Link>
               <Link to="/signup">
                  <span>Sign Up</span>
               </Link>
               <Link to="/create-lineup">
                  <span>Create a Lineup</span>
               </Link>
            </div>
         </NavBar>
      );
   }
}

export default Nav;
