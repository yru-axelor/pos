import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Axelor POS</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;
