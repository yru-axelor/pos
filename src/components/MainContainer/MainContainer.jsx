import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { data } from "../../data";
import { Cart } from "../Cart";
import Toasts from "../Toasts";
import NavBar from "../NavBar/NavBar";

import { Popover } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function MainContainer() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    type: "",
    sort: { based: "", inAsc: false },
  });
  const [toastsList, setToastsList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // useEffect for setting initial cart and product on initial render

  // function to add elements in cart
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

    setToastsList((toasts) => [
      ...toasts,
      { title: item.title, action: "Added" },
    ]);
    // removing toasts from the page
    setTimeout(() => {
      setToastsList((prev) => prev.slice(1));
    }, 3000);
  };
  // function to remove elements from cart
  const handleRemove = (item) => {
    setTotal((t) => t - item.price);

    const updatedItems = items
      .map((i) => (i.id !== item.id ? i : { ...i, quantity: i.quantity - 1 }))
      .filter((i) => i.quantity !== 0);
    setItems(updatedItems);

    setToastsList((toasts) => [
      ...toasts,
      { title: item.title, action: "Removed" },
    ]);
    setTimeout(() => {
      setToastsList((prev) => prev.slice(1));
    }, 3000);
  };
  // function to update product section when any action happen
  const handleFilterChange = () => {
    const { type, sort } = filters;
    const { based, inAsc } = sort;

    if (type === "" && based === "") {
      setFilteredItems(data);
      return;
    }
    let updateditem = [...data];

    // Filter by type
    if (type !== "") {
      updateditem = data.filter((item) => item.type === type);
    }

    const order = inAsc ? 1 : -1;
    // Sorting on based in inAsc
    if (based === "asc") {
      updateditem.sort((a, b) => order * (a.price - b.price));
    } else if (based === "title") {
      updateditem.sort((a, b) => order * a.title.localeCompare(b.title));
    } else if (based === "category") {
      updateditem.sort((a, b) => order * a.type.localeCompare(b.type));
    }

    setFilteredItems(updateditem);
  };
  // Cart PopOver
  const cartPopOver = (
    <Popover id="popover-positioned-bottom" title="My Cart" className="popover">
      <div className="popover-cart">
        <h5>Cart</h5>
        <Cart
          items={items}
          total={total}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
      </div>
    </Popover>
  );

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    const total = JSON.parse(localStorage.getItem("total"));
    setItems(storedItems || []);
    setTotal(total || 0);
    setFilteredItems(data);
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  useEffect(() => handleFilterChange(), [filters]);
  // useEffect for setting localStorage whenever cart-items gets updated
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("total", JSON.stringify(total));
    // eslint-disable-next-line
  }, [items]);

  return (
    <>
      <NavBar
        items={items}
        filters={filters}
        setFilters={setFilters}
        cartPopOver={cartPopOver}
      />

      <Container fluid>
        <Row>
          {/* Product Section */}
          <Col md="8" sm="8">
            <Row md="4" sm={"6"} xs={"6"}>
              {filteredItems.map((d) => (
                <Product
                  key={d.id}
                  price={d.price}
                  title={d.title}
                  img={d.img}
                  onClick={handleAdd}
                  item={d}
                />
              ))}
            </Row>
          </Col>
          {/* Cart Section */}
          <Col md="4" sm="3">
            <Cart
              items={items}
              total={total}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />
          </Col>

          <div className="toast-container position-absolute bottom-0 end-0">
            {toastsList.map((toast, i) => (
              <Toasts
                toastTitle={toast.title}
                toastAction={toast.action}
                key={i}
              />
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
}
