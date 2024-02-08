import React from "react";
import Badge from "react-bootstrap/Badge";
function FillCart({ item }) {
  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.title}</div>₹ {item.price} x
        {item.quantity}
      </div>
      <Badge variant="primary" pill>
        {(item.price * item.quantity).toFixed(2)}
      </Badge>
    </>
  );
}

export default FillCart;
