import React from "react";
import Toast from "react-bootstrap/Toast";
const Toasts = ({ toastTitle, toastAction }) => {
  return (
    <Toast delay={3000} autohide show>
      <Toast.Header>
        <strong className="me-auto">{toastTitle}</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{toastAction} successfully</Toast.Body>
    </Toast>
  );
};
export default Toasts;
