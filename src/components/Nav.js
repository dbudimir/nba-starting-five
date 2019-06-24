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
   handelLogOut = () => {
      this.props.logOut();
   };

   render() {
      return (
         <NavBar>
            <Link to="/">
               <h1>QSR Orders</h1>
            </Link>
            <div>
               <Link to="/">
                  <span>Chains</span>
               </Link>
               <a href="/orders/all">
                  <span>Orders</span>
               </a>
               <Link to={`/users/${this.props.userId}`}>
                  <span>My Orders</span>
               </Link>
               <Link to="/create">
                  <span>Create an Order</span>
               </Link>
               <Link to="/login">
                  <span>Login</span>
               </Link>
               <Link to="/signup">
                  <span>Signup</span>
               </Link>
               <span onClick={this.handelLogOut} role="button" tabIndex="0">
                  Logout
               </span>
            </div>
         </NavBar>
      );
   }
}

export default Nav;
