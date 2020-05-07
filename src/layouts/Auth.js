import React from "react";

import Navbar from "../components/Navbar";

const Auth = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Auth;
