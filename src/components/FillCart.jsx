import React from "react";
import Badge from "react-bootstrap/Badge";
function FillCart({ item, handleAdd, handleRemove }) {
  return (
    <>
      <div className="ms-2 me-auto fill-cart">
        <div className="fw-bold">{item.title}</div>
        <button className="add-btn" onClick={() => handleAdd(item)}>
          +
        </button>
        {item.quantity}
        <button className="remove-btn" onClick={() => handleRemove(item)}>
          -
        </button>
      </div>
      <Badge bg="" className="cart-badge" pill>
        {(item.price * item.quantity).toFixed(2)}
      </Badge>
    </>
  );
}

export default FillCart;
