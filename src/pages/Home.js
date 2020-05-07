import React from "react";

import { Container, Row, Col } from "reactstrap";

const Home = () => {
  return (
    <>
      <Container className="vh-100 vw-100">
        <Row className="h-100 text-center mt-5 pt-5">
          <Col className="ml-auto mr-auto" lg="6">
            <h1 className="mt-5 pt-5 display-3">
              <strong>Boticash</strong>
              <hr />
            </h1>
            <p className="pt-3 lead">O portal do Boticário para cashback.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
