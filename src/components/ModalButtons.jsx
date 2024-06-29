import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function ModalButtons(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearch = () => {
    navigate(`/search?query=${searchTerm}`);
    props.onHide();
  };


  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="ms-3 mt-2">
          <Modal.Title id="contained-modal-title-vcenter">
            Search for item
          </Modal.Title>
        </div>
        <Modal.Body>
          <Form.Control 
          type="text" 
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Modal.Body>
        <div className="d-flex justify-content-between mx-5 mb-3">
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal>
    </>
  );
}
