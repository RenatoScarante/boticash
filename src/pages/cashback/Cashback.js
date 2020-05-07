import React, { useState, useEffect } from "react";

import { getUser } from "../../services/user";
import { getCashbackRules, getCashback } from "../../services/cashback";

import { Container, UncontrolledCollapse, Table, Row } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Cashback = () => {
  const user = getUser();
  const [cashback, setCashback] = useState({});
  const [cashbackRules, setCashbackRules] = useState([]);

  useEffect(() => {
    handleCashbackRules();
    handleCashback();
  }, []);

  async function handleCashbackRules() {
    try {
      setCashbackRules(await getCashbackRules());
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCashback() {
    try {
      await setCashback(await getCashback(user.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="pt-4">
      <h2>
        <strong>Cashback</strong>
      </h2>
      <div>
        <h4>Acumulado até o momento</h4>
        <br />
        <p
          className="lead"
          style={{
            padding: "1.5rem",
            backgroundColor: "whiteSmoke",
            borderRadius: "5px"
          }}
        >
          <span>Valor </span>
          <strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(
              cashback.accumulated_value ? cashback.accumulated_value : 0
            )}
          </strong>
        </p>
        <p className="text-muted">
          <span>Última compra realizada em </span>
          <strong>
            {cashback.last_date &&
              new Intl.DateTimeFormat("pt-BR", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
              }).format(new Date(cashback.last_date))}
          </strong>
        </p>
      </div>
      <div id="rules">
        <Row>
          <div className="col">
            <h4>Regras do Cashback</h4>
          </div>
          <div className="col text-right">
            <h4>
              <FontAwesomeIcon icon={faCaretDown} />
            </h4>
          </div>
        </Row>
        <br />
        <UncontrolledCollapse toggler="#rules">
          <Table hover striped responsive>
            <thead>
              <tr className="text-center">
                <th>Nome</th>
                <th>Valor de</th>
                <th>Valor até</th>
                <th>%</th>
                <th className="text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {cashbackRules.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(item.start_value)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(item.end_value)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "decimal"
                    }).format(item.percent)}
                  </td>
                  <td className="text-left">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </UncontrolledCollapse>
      </div>
    </Container>
  );
};

export default Cashback;
