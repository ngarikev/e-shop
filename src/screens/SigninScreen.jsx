import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin= async (e)=> {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("successfully loged in");
      toast.success("Successfully logged in", {
        position: "top-right",
      });
      navigate("/");
      
    } catch (error) {
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
          <Form onSubmit={handleSignin} className="form p-5 w-100">
            <h5 className="text-center">Login</h5>
            <Form.Group className="my-3">
              <Form.Label>
                Email address<span className="required text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e)=> setEmail(e.target.value)}
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
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn">Login</Button>
            <p className="mt-3 text-success">
              Not registered yet?
              <Link to="/signupscreen" className="ms-2">
                Signup here
              </Link>
            </p>
          </Form>
        </Container>
      </main>
    </>
  );
}
