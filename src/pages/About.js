import React from "react";

import Navbar from "../components/Navbar";
import { Container, Row, Col } from "reactstrap";

const About = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(" + require("../assets/background-profile.jpg") + ")"
        }}
        className="page-header page-header-xs"
        data-parallax={true}
      >
        <div className="filter" />
      </div>
      <div className="profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="rounded-circle img-no-padding img-responsive"
                style={{ width: "100%", height: "100%" }}
                src={require("../assets/avatar-renato.jpeg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Renato Scarante <br />
              </h4>
              <h6 className="description">Desenvolvedor</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-justify" md="6">
              <p>
                Com 37 anos, casado, pai de dois filhos lindos, desde os 15
                anos, diversas empresas de pequeno a grande porte sempre na área
                de tecnologia, também diversas linguagens, sempre como
                full-stack (mesmo antes desse termo se popularizar).
              </p>
              <br />
              <p>
                Bem humorado, simpático, curioso, parceiro, fácil adaptação por
                onde passa. A personalidade juntamente com a experiência
                profissional possibilitam tal feito.
              </p>
              <br />
              <p>
                Depois vários tipos de negócios e várias linguagens, desde um
                grande banco até um pequena empresa de tecnologia, do COBOL ao
                C#, e atualmente com ReactJS / NodeJS (JavaScript) e Microsoft
                Dynamics.
              </p>
            </Col>
          </Row>
          <Row className="text-center my-4">
            <Col>
              <Row>
                <div className="small col">
                  <div>
                    <strong>Cidade</strong>
                  </div>
                  <div>Curitiba - PR</div>
                </div>
                <div className="small col">
                  <div>
                    <strong>Celular</strong>
                  </div>
                  <div>+55 41 98854-0622</div>
                </div>

                <div className="small col">
                  <div>
                    <strong>E-mail</strong>
                  </div>
                  <div>renato@scarante.com</div>
                </div>
                <div className="small col">
                  <div>
                    <strong>Web</strong>
                  </div>
                  <div>www.scarante.com/renato</div>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="text-center my-4">
            <Col>
              <Row>
                <div className="col">
                  <a
                    href="https://www.linkedin.com/in/renato-scarante-9bb31019/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{ fontSize: "2rem" }}
                  >
                    <i className="fa fa-linkedin" />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://github.com/RenatoScarante?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{ fontSize: "2rem" }}
                  >
                    <i className="fa fa-github" />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="http://www.scarante.com/renato"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Renato Scarante"
                    style={{ fontSize: "2rem" }}
                  >
                    <i className="fa fa-globe" />
                  </a>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
        <br />
      </div>
    </>
  );
};

export default About;
