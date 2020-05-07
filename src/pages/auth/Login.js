import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router";

import { login } from "../../redux/actions/authActions";
import { setUser } from "../../redux/actions/userActions";

import api from "../../services/api";

import { Container, Row, Col, Card, Button, Form, Input } from "reactstrap";

const Login = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });

  async function handleLogin() {
    try {
      const authentication = data;

      await api
        .post(process.env.REACT_APP_USER_AUTHENTICATE_URL, authentication)
        .then(res => {
          let user = res.data.user;
          let token = res.data.token;

          dispatch(login({ token }));
          dispatch(setUser({ user }));

          toastr.success(
            "Login realizado com sucesso",
            `Bem vindo ${user.name}`
          );

          history.push("/home");
        })
        .catch(error => {
          console.log(error);

          toastr.error(
            `Erro`,
            `Erro ao realizar o login ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(
        `Erro`,
        `Erro ao realizar o login ${error.response.data.message}`
      );
    }
  }

  return (
    <div className="page-header">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Bem vindo</h3>
              <Form className="register-form">
                <label>E-mail</label>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                />
                <label>Senha</label>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                />
                <div className="forgot text-right">
                  <Link to="/esqueci-a-senha">
                    <Button className="btn-link m-0 p-0" color="danger">
                      <small>Esqueceu a senha?</small>
                    </Button>
                  </Link>
                </div>
                <Button
                  block
                  className="btn-round"
                  color="primary"
                  type="button"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Entrar
                </Button>
                <div className="forgot">
                  <Link to="/registrar">
                    <Button className="btn-link" color="secondary">
                      Não possui uma conta? Registre-se.
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
