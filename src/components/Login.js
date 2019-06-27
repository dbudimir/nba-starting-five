import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ErrorMessage from './ErrorMessage';

const Form = styled.div`
   .label {
      margin-top: 12px;
      font-weight: 800;
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
            formErrors.email = emailValid ? '' : 'Please use a valid email address.';
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
            this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid,
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
            this.props.logIn(this.state.email, this.state.password, response.data.userId, true);
         });
      alert('Nice!');
   };

   render() {
      return (
         <div className="form">
            <h1>Log In</h1>
            <Form>
               <input
                  name="email"
                  onChange={this.updateState}
                  value={this.state.email}
                  type="text"
                  placeholder="email"
               />
               <ErrorMessage message={this.state.formErrors.email} state={this.state} />
               <input
                  name="password"
                  onChange={this.updateState}
                  value={this.state.password}
                  type="password"
                  placeholder="password"
               />
               <ErrorMessage message={this.state.formErrors.password} state={this.state} />
               <input name="submit" onClick={this.onSubmit} type="submit" value="submit" />
            </Form>
         </div>
      );
   }
}

export default Login;
