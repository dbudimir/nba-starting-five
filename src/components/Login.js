import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import ErrorMessage from './ErrorMessage';

const Form = styled.div`
   margin-top: 60px;
   h3 {
      margin-bottom: 32px;
   }
   .label {
      margin-top: 12px;
      font-weight: 800;
   }
   input {
      width: 500px;
      height: 48px;
      border: 0px;
      border-bottom: 3px solid #000000;
      font-size: 32px;
      margin-bottom: 12px;
      margin-top: 32px;
      padding: 0 4px;
   }
   input::placeholder {
      font-size: 32px;
      padding: 6px 6px 0;
      line-height: 1;
   }
   input[name='submit'] {
      border-radius: 6px;
      margin-bottom: 64px;
      border-bottom: 0px;
      font-size: 24px;
      font-weight: 800;
      background-color: #fa8320;
      width: 200px;
   }
   span {
      display: block;
   }
`;

class Login extends Component {
   constructor() {
      super();
      this.state = {
         userId: '',
         full_name: '',
         username: '',
         email: '',
         password: '',
         passwordConfirm: '',
         formErrors: {
            email: '',
            password: '',
            confirmPassword: '',
         },
         emailValid: false,
         passwordValid: false,
         confirmPasswordValid: false,
         allValid: false,
         isLoggedIn: '',
      };
   }

   componentDidMount = () => {
      this.setState({
         email: this.props.email,
         password: this.props.password,
         isLoggedIn: false,
      });
   };

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState(
         {
            [name]: value,
         },
         () => {
            this.validateFields(name, value);
         }
      );
   };

   validateFields = (fieldName, value) => {
      const { formErrors } = this.state;
      let { emailValid } = this.state;
      let { passwordValid } = this.state;
      const { confirmPasswordValid } = this.state;

      switch (fieldName) {
         case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            formErrors.email = emailValid
               ? ''
               : 'Please use a valid email address.';
            break;
         case 'password':
            passwordValid = value.length >= 7;
            formErrors.password = passwordValid
               ? ''
               : "Please use a password that's longer thant 7 charcters";
            break;
         default:
            break;
      }

      this.setState(
         {
            formErrors,
            emailValid,
            passwordValid,
            confirmPasswordValid,
         },
         this.validateAll
      );
   };

   validateAll = () => {
      this.setState({
         allValid:
            this.state.emailValid &&
            this.state.passwordValid &&
            this.state.confirmPasswordValid,
      });
   };

   onSubmit = async event => {
      event.preventDefault();
      const { state } = this;
      axios
         .post('https://nba-starting-five.herokuapp.com/api/users/login', {
            ...state,
         })
         .then(response => {
            localStorage.token = response.data.token;
            this.setState({
               isLoggedIn: true,
               userId: response.data.userId,
            });
            this.props.logIn(
               this.state.email,
               this.state.password,
               response.data.userId,
               true
            );
         });
   };

   render() {
      return (
         <div className="form">
            <Form className="user-form">
               <h3>Log In</h3>
               <input
                  name="email"
                  onChange={this.updateState}
                  value={this.state.email}
                  type="text"
                  placeholder="Enter your email"
               />
               <ErrorMessage
                  message={this.state.formErrors.email}
                  state={this.state}
               />
               <input
                  name="password"
                  onChange={this.updateState}
                  value={this.state.password}
                  type="password"
               />
            <ErrorMessage
                  message={this.state.formErrors.password}
                  state={this.state}
               />
               <input
                  name="submit"
                  onClick={this.onSubmit}
                  type="submit"
                  value="submit"
               />
               <span className="sign-up-now">
                  Don't have an account?{' '}
                  <Link to="/signup"> Click here to sign up now</Link>
               </span>
            </Form>
         </div>
      );
   }
}

export default Login;
