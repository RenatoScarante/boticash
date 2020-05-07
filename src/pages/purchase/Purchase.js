import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toastr } from "react-redux-toastr";

import {
  getPurchase,
  updatePurchase,
  deletePurchase
} from "../../services/purchase";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

const INITIAL_STATE = {
  code: "",
  value: 0.0,
  date: "",
  userId: "",
  purchase_statusId: 1,
  status: {
    id: 1,
    description: "",
    canEdit: false,
    canDelete: false
  }
};

const Purchase = props => {
  const history = useHistory();
  const id = props.match.params.id;
  const [purchase, setPurchase] = useState(INITIAL_STATE);

  useEffect(() => {
    handleGetPurchase();
  }, []);

  async function handleGetPurchase() {
    try {
      setPurchase(await getPurchase(id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdatePurchase() {
    try {
      await updatePurchase(purchase).then(res => {
        setPurchase(res);
        toastr.success("Alteração", `Alteração(ões) realizada(s) com sucesso`);

        history.push("/compras");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePurchase() {
    try {
      await deletePurchase(purchase.id).then(res => {
        setPurchase(res);
        toastr.success("Exclusão", `Exclusão realizada com sucesso`);

        history.push("/compras");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="pt-4">
      {purchase === {} ? (
        <h2>
          <strong>Compra não encontrada</strong>
        </h2>
      ) : (
        <React.Fragment>
          <div className="mb-4">
            <h2>
              <strong>{purchase ? `#${purchase.code}` : "Nova compra"}</strong>
              <p className="text-muted">{purchase.status.description}</p>
            </h2>
          </div>
          <Row>
            <Col>
              <Form
                inline
                className="justify-content-between d-block d-md-flex"
              >
                <FormGroup>
                  <Label for="code" className="mr-2">
                    Código
                  </Label>
                  <Input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Código da compra"
                    value={purchase.code}
                    onChange={e =>
                      setPurchase({ ...purchase, code: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date" className="mr-2">
                    Data da compra
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Data da compra"
                    value={purchase.date}
                    onChange={e =>
                      setPurchase({ ...purchase, date: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="value" className="mr-2">
                    Valor da compra
                  </Label>
                  <Input
                    type="decimal"
                    name="value"
                    id="value"
                    placeholder="Qual o valor da compra"
                    value={purchase.value}
                    onChange={e =>
                      setPurchase({
                        ...purchase,
                        value: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup className="w-100 mt-4 justify-content-end">
                  <Link to="/compras" className="mr-auto">
                    Voltar
                  </Link>
                  {purchase.status.canDelete && (
                    <Button
                      className="mr-2"
                      color="danger"
                      onClick={handleDeletePurchase}
                    >
                      Excluir
                    </Button>
                  )}
                  <Button color="primary" onClick={handleUpdatePurchase}>
                    Salvar
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Purchase;
