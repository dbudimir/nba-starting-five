import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
   background: #000000;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: #ffffff;
   padding: 0px 24px;
   flex-wrap: wrap;
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
   @media (max-width: 768px) {
      h1 {
         flex-basis: 100%;
      }
      .menu {
         display: flex;
         width: 100%;
         justify-content: inherit;
         margin-bottom: 12px;
      }
      .menu div {
         margin-bottom: 12px;
      }
      .menu span {
         margin: 0px;
      }
   }
`;

class Nav extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoggedIn: this.props.isLoggedIn,
         userId: this.props.userId,
      };
   }

   render() {
      let userLoggedIn;
      if (localStorage.length > 0) {
         userLoggedIn = (
            <div>
               <Link to="/" onClick={this.props.logOut}>
                  <span>Log Out</span>
               </Link>
               <Link to={`/users/${localStorage.userId}`}>
                  <span>My Lineups</span>
               </Link>
            </div>
         );
      } else if (localStorage.length === 0) {
         userLoggedIn = (
            <Link to="/login">
               <span>Log In</span>
            </Link>
         );
      }

      return (
         <NavBar>
            <Link to="/">
               <h1>Starting Five</h1>
            </Link>
            <div className="menu">
               {userLoggedIn}
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
