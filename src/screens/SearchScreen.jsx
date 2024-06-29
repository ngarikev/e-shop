import React from "react";
import AllData from "../Data/AllData";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";



const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


export default function SearchScreen() {

  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";

  const results = AllData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );



  return (
    <>
    <Container className="mt-3">
      <h1>Search Results for "{searchTerm}"</h1>
      {results.length === 0 ? (
        <h3>No items found</h3>
      ) : (
        <Row>
          {results.map((item) => (
            <Col key={item.id} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.Img} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  <Button variant="primary" as={Link} to={`/product/${item.id}`}>
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    
    
    
    </>





  ) 

}
