import React, { Component } from 'react';

class ErrorMessage extends Component {
   render() {
      return (
         <div>
            <p>{this.props.message}</p>
         </div>
      );
   }
}

export default ErrorMessage;
