import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AllData from "../Data/AllData";
import { Button, Col, Container, Row } from "react-bootstrap";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import { useCart } from "../Context/CartContext";

export default function ProductScreen() {
  const { id } = useParams();

  const { cart, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const product = AllData.find((item) => item.id == parseInt(id));
  if (!product) {
    return <h1>product not found</h1>;
  }

  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === product.id);
    setIsInCart(itemInCart ? true : false);
    setQuantity(itemInCart ? itemInCart.quantity : 1);
  }, [cart, product.id]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  const handleRemoveFromCart = () => {
    console.log("Removing item from cart:", product.id);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: product.id },
    });
  };

  return (
    <>
      <Header />
      <Link className=" m-3" to="/">
        Back to Home
      </Link>
      <Container>
        <Row className="mt-3 ">
          <Col className="text-center card mb-3 p-3 " lg={6}>
            <img src={product.Img} alt={product.name} className="img-fluid" />
          </Col>

          <Col className="ms-5 text-left" lg={5}>
            <h1 className="title my-4">{product.name}</h1>
            <p>{product.descrip}</p>

            <hr />
            <div className="star">
              <StarRating rating={product.rating} />
            </div>
            <p style={{ color: product.stock >= 1 ? "green" : "red" }}>
              {product.stock >= 1
                ? `${product.stock} Items left`
                : "Out of stock"}
            </p>
            <h1 className="price">Price: {product.price}</h1>
            <hr />
            <Row>
              <Col lg={3}>
                <select
                  className="p-2 option"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  disabled={isInCart}
                >
                  {[
                    ...Array(product.stock)
                      .keys()
                      .map((x, i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      }),
                  ]}
                </select>
              </Col>
              <Col>
                {isInCart ? (
                  <Button onClick={handleRemoveFromCart} className="px-5">
                    <i className="fa-solid fa-cart-shopping me-3"></i> Remove
                    from Cart
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="px-5">
                    <i className="fa-solid fa-cart-shopping me-3"></i>Add To
                    Cart
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
