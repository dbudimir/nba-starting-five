import styled from 'styled-components';

const Form = styled.div`
   display: block;
   margin: 60px auto 0;
   width: fit-content;
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

export default Form;
