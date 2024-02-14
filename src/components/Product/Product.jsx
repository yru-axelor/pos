import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Product(props) {
  return (
    <Card className="mb-3 mx-3 col-sm-6 col-md-4 col-lg-2 " >
      <Card.Img variant="top" className=" object-fit-contain" src={props.img} style={{ height: "200px" }} />
      <Card.Body>
        <Card.Title className="fs-5">{props.title}</Card.Title>
        <Card.Text>₹ {props.price}</Card.Text>
        <Button variant="primary" style={{
          backgroundColor: "#6d28d9",
          border: "none"
        }} onClick={() => props.onClick(props.item)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
