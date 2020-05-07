import React from "react";

import styled from "styled-components";

import { Form } from "reactstrap";

const CustomForm = styled(Form)`
  width: 360px;

  h2 {
    font-size: 2.9rem;
    font-weight: bold;
    text-transform: uppercase;
    margin: 2rem 0;
    color: #333;
    text-align: center;
  }

  button {
    width: 100%;
    border-radius: 5px;
    margin-top: 1rem;
  }
`;

export default props => {
  return <CustomForm {...props} />;
};
