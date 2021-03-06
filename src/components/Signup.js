import React, { Component } from 'react';
import axios from 'axios';

import Form from './styles/Form';

import ErrorMessage from './ErrorMessage';

class Signup extends Component {
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
      };
   }

   componentDidMount = () => {
      this.setState({
         full_name: '',
         username: '',
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

   onSubmit = async event => {
      event.preventDefault();
      const { state } = this;
      console.log(this.state);
      axios
         .post('https://nba-starting-five.herokuapp.com/api/users/signup', {
            ...state,
         })
         .then(response => {
            localStorage.token = response.data.token;
            this.setState({
               userId: response.data.userId,
               isLoggedIn: true,
            });
            this.props.logIn(
               this.state.email,
               this.state.password,
               response.data.userId,
               true
            );
         });
      alert("You're in!");
   };

   validateFields(fieldName, value) {
      const { formErrors } = this.state;
      let { emailValid } = this.state;
      let { passwordValid } = this.state;
      let { confirmPasswordValid } = this.state;

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
               : "Please use a password that's longer thant 7 characters";
            break;
         case 'passwordConfirm':
            confirmPasswordValid =
               this.state.password === this.state.passwordConfirm;
            formErrors.confirmPassword = confirmPasswordValid
               ? ''
               : 'The passwords do not match.';
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
   }

   validateAll() {
      this.setState({
         allValid:
            this.state.emailValid &&
            this.state.passwordValid &&
            this.state.confirmPasswordValid,
      });
   }

   render() {
      return (
         <div className="form">
            <Form className="signup-form">
               <h3>Sign Up</h3>
               <form>
                  <input
                     name="full_name"
                     onChange={this.updateState}
                     value={this.state.full_name}
                     type="text"
                     placeholder="Enter your full name"
                  />
                  <div>
                     <br />
                  </div>
                  <input
                     name="email"
                     onChange={this.updateState}
                     value={this.state.email}
                     type="text"
                     placeholder="Email"
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
                     placeholder="Password"
                  />
                  <ErrorMessage
                     message={this.state.formErrors.password}
                     state={this.state}
                  />
                  <input
                     name="passwordConfirm"
                     onChange={this.updateState}
                     value={this.state.passwordConfirm}
                     type="password"
                     placeholder="Re-enter password"
                  />
                  <ErrorMessage
                     message={this.state.formErrors.confirmPassword}
                     state={this.state}
                  />
                  <input
                     name="submit"
                     onClick={this.onSubmit}
                     type="submit"
                     value="Sign Up"
                  />
               </form>
            </Form>
         </div>
      );
   }
}

export default Signup;
