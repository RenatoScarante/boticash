import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";

import { getUser } from "../../services/user";
import { getPurchaseList, deletePurchase } from "../../services/purchase";

import NewPurchase from "./components/NewPurchase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Table } from "reactstrap";

const ItemPurchase = ({ item, handleDeletePurchase }) => {
  return (
    <tr className="text-center">
      <td>
        <strong>{item.code}</strong>
      </td>
      <td>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(item.value)}
      </td>
      <td>
        {new Intl.DateTimeFormat("pt-BR", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        }).format(new Date(item.date))}
      </td>
      <td>
        {new Intl.NumberFormat("pt-BR", {
          style: "decimal"
        }).format(item.cashbackPercent ? item.cashbackPercent : 0)}
      </td>
      <td>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(item.cashbackValue ? item.cashbackValue : 0)}
      </td>
      <td>{item.status.description}</td>
      <td>
        <Row className="justify-content-center">
          <Col sm={2}>
            {item.status.canEdit && (
              <Link to={`/compra/${item.id}`}>
                <FontAwesomeIcon icon={faPen} />
              </Link>
            )}
          </Col>
          <Col sm={2}>
            {item.status.canDelete && (
              <div onClick={() => handleDeletePurchase(item.id)}>
                <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
              </div>
            )}
          </Col>
        </Row>
      </td>
    </tr>
  );
};

const ListPurchaseTable = ({ items, handleDeletePurchase }) => {
  return (
    <Table hover striped responsive>
      <thead>
        <tr className="text-center">
          <th>Código</th>
          <th>Valor da compra</th>
          <th>Data da compra</th>
          <th>% de Cashback</th>
          <th>Valor de cashback</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ItemPurchase
            item={item}
            key={index}
            handleDeletePurchase={handleDeletePurchase}
          />
        ))}
      </tbody>
    </Table>
  );
};

const Purchases = () => {
  const user = getUser();

  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    handlePurchaseList();
  }, []);

  async function handlePurchaseList() {
    try {
      setPurchaseList(await getPurchaseList(user.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePurchase(purchaseId) {
    try {
      if (deletePurchase(purchaseId)) {
        handlePurchaseList();
        toastr.info("Exlcusão da compra", `Compra excluída com sucesso`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="pt-4">
      <h2>
        <strong>Compras</strong>
      </h2>
      <div id="new">
        <h4>Nova compra</h4>
        <br />
        <NewPurchase handlePurchaseList={handlePurchaseList} />
      </div>
      <div>
        <h4>Compras realizadas</h4>
        <br />
        <ListPurchaseTable
          items={purchaseList}
          handleDeletePurchase={handleDeletePurchase}
        />
      </div>
    </Container>
  );
};

export default Purchases;
