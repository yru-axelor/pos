import React from "react";
import styles from "./NavBar.module.css";
import { Dropdown, OverlayTrigger } from "react-bootstrap";
import { Badge } from "react-bootstrap";

const NavBar = ({ filters, setFilters, cartPopOver, items }) => {
  const active = filters.sort.based;
  const inAsc = filters.sort.inAsc;
  const activetype = filters.type;
  return (
    <nav className={`${styles.nav} mb-3`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h4 className="activetype">Grofer Basket</h4>
          <span
            className={`${
              activetype === "" ? "activetype" : ""
            } activetypecursor `}
            onClick={() => setFilters((prev) => ({ ...prev, type: "" }))}
          >
            All
          </span>
          <span
            className={`${
              activetype === "fruits" ? "activetype" : ""
            } activetypecursor`}
            onClick={() => setFilters((prev) => ({ ...prev, type: "fruits" }))}
          >
            Fruit
          </span>
          <span
            className={`${
              activetype === "vegetable" ? "activetype" : ""
            } activetypecursor`}
            onClick={() =>
              setFilters((prev) => ({ ...prev, type: "vegetable" }))
            }
          >
            Vegetables
          </span>
          <span
            className={`${
              activetype === "seed" ? "activetype" : ""
            } activetypecursor`}
            onClick={() => setFilters((prev) => ({ ...prev, type: "seed" }))}
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
              <Dropdown.Item
                className={`${active === "asc" ? "active" : ""} hov`}
                onClick={() =>
                  setFilters((filter) => ({
                    ...filter,
                    sort: { based: "asc", inAsc: !filter.sort.inAsc },
                  }))
                }
              >
                By Price &nbsp;
                {active !== "asc" ? (
                  ""
                ) : inAsc ? (
                  <i class="ri-sort-asc"></i>
                ) : (
                  <i class="ri-sort-desc"></i>
                )}
              </Dropdown.Item>
              <Dropdown.Item
                className={`${active === "title" ? "active" : ""} hov`}
                onClick={() =>
                  setFilters((filter) => ({
                    ...filter,
                    sort: { based: "title", inAsc: !filter.sort.inAsc },
                  }))
                }
              >
                By Title &nbsp;
                {active !== "title" ? (
                  ""
                ) : inAsc ? (
                  <i class="ri-sort-asc"></i>
                ) : (
                  <i class="ri-sort-desc"></i>
                )}
              </Dropdown.Item>
              <Dropdown.Item
                className={`${active === "category" ? "active" : ""} hov`}
                onClick={() =>
                  setFilters((filter) => ({
                    ...filter,
                    sort: { based: "category", inAsc: !filter.sort.inAsc },
                  }))
                }
              >
                By Category &nbsp;
                {active !== "category" ? (
                  ""
                ) : inAsc ? (
                  <i class="ri-sort-asc"></i>
                ) : (
                  <i class="ri-sort-desc"></i>
                )}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="hov"
                onClick={() => setFilters({ type: "", sort: "" })}
              >
                clear
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.right}>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={cartPopOver}
            rootClose
          >
            <div className="notifyContainer">
              <i className="ri-shopping-cart-fill cart-icon"></i>
              <Badge bg="danger" className="notify" pill>
                {items.length}
              </Badge>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
