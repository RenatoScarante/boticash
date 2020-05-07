import React from "react";

import styled from "styled-components";

import { Container } from "reactstrap";

const CustomContainer = styled(Container)`
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: center;
`;

export default props => {
  return <CustomContainer {...props} />;
};
