import React from "react";

import Navbar from "../components/Navbar";

const Default = ({ children }) => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      {children}
    </>
  );
};

export default Default;
