import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Product(props) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title className="fs-5">{props.title}</Card.Title>
        <Card.Text>₹ {props.price}</Card.Text>
        <Button variant="primary" onClick={() => props.onClick(props.item)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
