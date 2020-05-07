import React, { useState } from "react";
import { toastr } from "react-redux-toastr";

import api from "../../../services/api";
import { getUser } from "../../../services/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const FormPurchase = props => {
  const user = getUser();
  const handlePurchaseList = props.handlePurchaseList;

  const INITIAL_STATE = {
    code: "",
    date: "",
    value: "",
    purchase_statusId: 1,
    userId: user.id
  };

  const [newPurchase, setNewPurchase] = useState(INITIAL_STATE);

  const [invalidFields, setInvalidFields] = useState({
    code: false,
    date: false,
    value: false
  });

  function handleCancel() {
    setNewPurchase(INITIAL_STATE);
  }

  async function handleNewPurchase() {
    setInvalidFields({
      code: newPurchase.code === "",
      date: newPurchase.date === "",
      value: newPurchase.value === ""
    });

    if (
      newPurchase.code === "" ||
      newPurchase.date === "" ||
      newPurchase.value === ""
    ) {
      return;
    }

    try {
      await api
        .post(`${process.env.REACT_APP_PURCHASE_POST}`, newPurchase)
        .then(res => {
          setNewPurchase(INITIAL_STATE);
          handlePurchaseList();
          toastr.info("Nova compra", "Compra adicionada com sucesso");
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {}
  }

  return (
    <Container style={{ ...props.style }}>
      <Row>
        <Col>
          <Form inline className="justify-content-between d-block d-md-flex">
            <FormGroup className="">
              <Label for="code" className="mr-2">
                Código
              </Label>
              <Input
                type="text"
                id="code"
                placeholder="Código da compra"
                value={newPurchase.code}
                onChange={e =>
                  setNewPurchase({ ...newPurchase, code: e.target.value })
                }
                invalid={invalidFields.code}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date" className="mr-2">
                Data
              </Label>
              <Input
                type="date"
                id="date"
                placeholder="Data da compra"
                value={newPurchase.date}
                onChange={e =>
                  setNewPurchase({ ...newPurchase, date: e.target.value })
                }
                invalid={invalidFields.date}
              />
            </FormGroup>
            <FormGroup>
              <Label for="value" className="mr-2">
                Valor
              </Label>
              <Input
                type="text"
                id="value"
                placeholder="Valor da compra"
                value={newPurchase.value}
                onChange={e =>
                  setNewPurchase({
                    ...newPurchase,
                    value: e.target.value
                  })
                }
                invalid={invalidFields.value}
                className="w-sm-100"
              />
            </FormGroup>
            <FormGroup className="text-right">
              <Button
                color="danger rounded-circle mr-2"
                onClick={() => handleCancel()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button
                color="primary rounded-circle"
                onClick={() => handleNewPurchase()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const containerStyle = {
  padding: "1.5rem",
  backgroundColor: "whiteSmoke",
  borderRadius: "5px"
};

const NewPurchase = props => {
  return <FormPurchase style={containerStyle} {...props} />;
};

export default NewPurchase;
