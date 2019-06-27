import React, { Component } from 'react';
import styled from 'styled-components';

const Error = styled.div`
   color: red;
   line-height: 0;
   margin-bottom: 12px;
   font-weight: 700;
`;

class ErrorMessage extends Component {
   render() {
      return (
         <Error className="error-message">
            <p>{this.props.message}</p>
         </Error>
      );
   }
}

export default ErrorMessage;
