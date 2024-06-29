import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../components/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function SignupScreen() {
  const [fname, setFname]= useState("");
  const [lname, setLname]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const navigate = useNavigate();

const handleRegister = async(e)=> {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstname: fname,
        lastname: lname,
      });
      toast.success("Successfully registered!", {
      position: "top-right",
    });
    }
    
    navigate("/signinscreen")
  } catch (error) {
    console.log(error.message);
    toast.error(error.message, {
      position: "top-center",
    });
  }
}



  return (
    <>
      <main>
        <Container className="d-flex justify-content-center container ">
          <Link className=" m-3" to="/">
            Back to Home
          </Link>
          <h4 className="text-center d-flex mb-3">Eshop</h4>
          <Form onSubmit={handleRegister} className="form p-5 w-100">
            <h5 className="text-center">Signup</h5>
            <Row className="mb-3 row">
              <Form.Group as={Col} controlId="formGridfName">
                <Form.Label>
                  First Name<span className="required text-danger">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  onChange={(e)=>setFname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridlName">
                <Form.Label className="last-name">
                  Last Name<span className="required text-danger ">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={(e)=>setLname(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="my-3">
              <Form.Label>
                Email address<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>
                Password<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn">Register</Button>
            <p className="mt-3 text-success">
              Already have an account?
              <Link className="ms-2" to="/signinscreen">
                Signin here
              </Link>
            </p>
          </Form>
        </Container>
      </main>
    </>
  );
}
