import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import FillCart from "./FillCart";
import EmptyCart from "./EmptyCart";
import Badge from "react-bootstrap/Badge";

export const Cart = ({ items, total, handleAdd, handleRemove }) => {
  return (
    <>
      {items.length !== 0 ? (
        <>
          <h3>Cart</h3>
          <ListGroup as="ol" numbered>
            {items.map((item, i) => (
              <ListGroup.Item
                key={i}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <FillCart
                  item={item}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup.Item className="d-flex justify-content-between align-items-center total">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Net Total</div>
            </div>
            <Badge bg="" className="cart-badge">
              {total.toFixed(2)}
            </Badge>
          </ListGroup.Item>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
