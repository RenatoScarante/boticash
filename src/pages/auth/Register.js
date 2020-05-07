import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router";

import { login } from "../../redux/actions/authActions";
import { setUser } from "../../redux/actions/userActions";

import api from "../../services/api";

import { Container, Card, Form, Row, Col, Button, Input } from "reactstrap";
import InputMask from "react-input-mask";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [invalidFields, setInvalidFields] = useState({
    name: false,
    cpf: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  async function handleRegister() {
    setInvalidFields({
      name: data.name === "",
      cpf: data.cpf === "",
      email: data.email === "",
      password: data.password === "",
      confirmPassword:
        data.confirmPassword === "" || data.confirmPassword !== data.password
    });

    if (
      data.name === "" ||
      data.cpf === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === "" ||
      data.confirmPassword !== data.password
    ) {
      return;
    }

    try {
      const register = data;

      delete register.confirmPassword;

      await api
        .post(process.env.REACT_APP_USER_POST, register)
        .then(res => {
          let user = res.data.user;
          let token = res.data.token;

          dispatch(login({ token }));
          dispatch(setUser({ user }));

          toastr.success(
            `Bem vindo ${user.name}`,
            "Registro realizado com sucesso"
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
      console.log(error);
      toastr.error(`Erro`, `Erro ao realizar o login ${error.message}`);
    }
  }

  return (
    <div className="page-header">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Registre-se</h3>
              <Form className="register-form">
                <label>Nome</label>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={data.name}
                  onChange={e => setData({ ...data, name: e.target.value })}
                  invalid={invalidFields.name}
                />
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={data.cpf}
                  onChange={e => setData({ ...data, cpf: e.target.value })}
                >
                  {inputProps => (
                    <Input
                      {...inputProps}
                      type="text"
                      placeholder="Seu CPF"
                      value={data.cpf}
                      invalid={invalidFields.cpf}
                    />
                  )}
                </InputMask>
                <label>E-mail</label>
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  invalid={invalidFields.email}
                />
                <label>Senha</label>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  invalid={invalidFields.password}
                />
                <label>Confirme a senha</label>
                <Input
                  type="password"
                  placeholder="Confirme a senha"
                  value={data.confirmPassword}
                  onChange={e =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  invalid={invalidFields.confirmPassword}
                />
                <Button
                  block
                  className="btn-round"
                  color="primary"
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  Registrar
                </Button>
                <div className="forgot">
                  <Link to="/entrar">
                    <Button className="btn-link" color="secondary">
                      Já possui uma conta? Entre.
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

export default Register;
