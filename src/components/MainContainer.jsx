import React, { useState } from "react";
import Product from "./Product";
import { data } from "../data";
import { Cart } from "./Cart";
import Toasts from "./Toasts";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const uniqueTypes = [...new Set(data.map((item) => item.type))];
export default function MainContainer() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ type: "", sortAsc: true });
  const [toastsList, setToastsList] = useState([]);

  const handleAdd = (item) => {
    setTotal((t) => t + item.price);
    const isExist = items.find((it) => it.id === item.id);
    if (isExist) {
      const updatedItems = items.map((i) =>
        i.id !== item.id ? i : { ...i, quantity: i.quantity + 1 }
      );
      setItems(updatedItems);
    } else {
      setItems((items) => [...items, item]);
    }

    setToastsList((toasts) => [...toasts, item.title]);
    setTimeout(() => {
      setToastsList((prev) => prev.slice(1));
    }, 3000);
  };

  const handleFilterChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type,
    }));
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortAsc: !prevFilters.sortAsc,
    }));
  };
  const filteredAndSortedData = data
    .filter((item) => !filters.type || item.type === filters.type)
    .sort((a, b) => {
      const order = filters.sortAsc ? 1 : -1;
      return order * (a.price - b.price);
    })

  return (
    <Container fluid>
      <Row>
        {/* Left container for filtering and sorting options */}
        <Col md="2" sm="2">
          <form action="">
            <label>Filter by Type:</label>
            <select
              onChange={(e) => handleFilterChange(e.target.value)}
              value={filters.type || ""}
              className="form-select"
            >
              <option value="">All</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <br />
            <label>Sort by Price:</label>
            <br />
            <button className="btn btn-outline-success" onClick={handleSortChange}>
              {filters.sortAsc ? "Sort Ascending" : "Sort Descending"}
            </button>
            <br />
          </form>
        </Col>
        {/* Container for ProductListing */}
        <Col md="6" sm="6">
          <Row>
            {filteredAndSortedData.map((d) => (
              <Col md="4" xl xxl="2" lg="6" sm="6" key={d.id}>
                <Product
                  price={d.price}
                  title={d.title}
                  img={d.img}
                  onClick={handleAdd}
                  item={d}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {/* Container for cart checkout */}
        <Col md="4" sm="4">
          <Cart items={items} total={total} />
        </Col>

        <div className="toast-container position-absolute top-0 end-0">
          {toastsList.map((toastTitle, i) => (

            <Toasts toastTitle={toastTitle} key={i} />

          ))}
        </div>
      </Row>
    </Container>
  );
}
