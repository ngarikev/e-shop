import React from "react";
import ElectronicsData from "../Data/ElectronicsData";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";


export default function Electronics() {
  return (
    <>
      <Container className="my-5 h-100">
        <h3>Electronics</h3>
        <hr />
        <Row>
          {ElectronicsData.map((item, i) => (
            <Col key={i}>
              <Link to={`/product/${item.id}`} className="text-decoration-none">
                <div className=" card card-electronic item mb-3">
                  <img src={item.Img} className="card-img-top img-fluid" alt="electronic"/>

                  <div className="card-body">
                    <h4 className="card-title">{item.name}</h4>

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
