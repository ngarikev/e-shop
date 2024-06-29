import React from "react";
import FashionData from "../Data/FashionData";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function Fashion() {
  return (
    <>
      <Container className="my-5 h-100">
        <h3>Fashion</h3>
        <hr />
        <Row>
          {FashionData.map((item, index) => (
            <Col key={index}>
              <Link to={`/product/${item.id}`} className="text-decoration-none">
                <div className="card item mb-3">
                  <img src={item.Img} className="card-img-top img-fluid" />

                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>

                    <div className="star">
                      <StarRating rating={item.rating} />
                    </div>

                    <p className="card-text para">{item.stock} Items left</p>
                    <p className="card-text bold">
                      <span>$: </span>
                      {item.price}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
