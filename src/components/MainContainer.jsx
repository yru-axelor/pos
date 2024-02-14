import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import { data } from "../data";
import { Cart } from "./Cart";
import Toasts from "./Toasts";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./MainContainer.module.css"
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Badge } from "react-bootstrap";
export const uniqueTypes = [...new Set(data.map((item) => item.type))];
export default function MainContainer() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ type: "", sort: "" });
  const [toastsList, setToastsList] = useState([]);
  const [filteredItems, setFilteredItems] = useState(data);
  useEffect(() => {
    handleFilterChange();
  }, [filters])

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

    setToastsList((toasts) => [...toasts, { title: item.title, action: "Added" }]);
    setTimeout(() => {
      setToastsList((prev) => prev.slice(1));
    }, 3000);
  };

  const handleRemove = (item) => {
    setTotal((t) => t - item.price);

    const updatedItems = items.map((i) =>
      i.id !== item.id ? i : { ...i, quantity: i.quantity - 1 }
    ).filter((i) => (
      i.quantity !== 0
    ))
    setItems(updatedItems);

    setToastsList((toasts) => [...toasts, { title: item.title, action: "Removed" }]);
    setTimeout(() => {
      setToastsList((prev) => prev.slice(1));
    }, 3000);
  };


  const handleFilterChange = () => {


    const { type, sort } = filters;



    if (type === "" && sort === "") {
      setFilteredItems(data);
      return;
    }
    let updateditem = [...data];


    // Filter by type
    if (type !== "") {
      updateditem = data.filter((item) => item.type === type);
    }



    // Sort
    if (sort === "asc") {
      updateditem.sort((a, b) => a.price - b.price);
    } else if (sort === "title") {
      updateditem.sort((a, b) => a.title.localeCompare(b.title))
    }
    else if (sort === "category") {
      updateditem.sort((a, b) => a.type.localeCompare(b.type))
    }

    setFilteredItems(updateditem)
  };

  const popoverLeft = (
    <Popover id="popover-positioned-bottom" title="My Cart" className="popover">
      <h5>Cart</h5>
      <Cart items={items} total={total} handleAdd={handleAdd} handleRemove={handleRemove} />
    </Popover>
  );


  return (<>
    <Navbar expand="lg" className={`${styles.nav} mb-3`}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <span
            className=""
          >
            Grofer Basket
          </span>
          <span
            className=""
            onClick={() => setFilters((prev) => ({ ...prev, "type": "" }))}
          >
            All
          </span>
          <span
            className=""
            onClick={() => setFilters((prev) => ({ ...prev, "type": "fruits" }))}
          >
            Fruit
          </span>
          <span
            className=""
            onClick={() => setFilters((prev) => ({ ...prev, "type": "vegetable" }))}
          >
            Vegetables
          </span>
          <span
            className=""
            onClick={() => setFilters((prev) => ({ ...prev, "type": "seed" }))}
          >
            Seeds
          </span>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                width: "100px",
                backgroundColor: "transparent",
                border: "none",
              }}
              id="dropdown-basic sort"
            >
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilters((filter) => ({ ...filter, "sort": "asc" }))}>
                By Price <span className="hidden">{filters.sort === "asc" ? <i class="ri-sort-desc"></i> : <i class="ri-sort-asc"></i>} </span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilters((filter) => ({ ...filter, "sort": "title" }))}>
                By Title
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilters((filter) => ({ ...filter, "sort": "category" }))}>
                By Category
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setFilters({ type: "", sort: "" })}>clear</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.right}>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popoverLeft}>
            <div className="notifyContainer">
              <i className="ri-shopping-cart-fill cart-icon"></i>
              <Badge bg="danger" className="notify" pill>{items.length}</Badge>

            </div>
          </OverlayTrigger>

        </div>

      </Container>
    </Navbar>

    <Container fluid>
      <Row>
        <Col md="8" sm="8">
          <Row>
            <>
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
            </>
          </Row>
        </Col>


        <Col md="4" sm="3" >
          <Cart items={items} total={total} handleAdd={handleAdd} handleRemove={handleRemove} />
        </Col>

        <div className="toast-container position-absolute bottom-0 end-0">
          {toastsList.map((toast, i) => (

            <Toasts toastTitle={toast.title} toastAction={toast.action} key={i} />

          ))}
        </div>
      </Row>
    </Container>
  </>
  );
}
