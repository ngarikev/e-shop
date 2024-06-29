import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Firebase";
import { PayPalButtons } from "@paypal/react-paypal-js";

export const CheckoutScreen = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Cart state:", cart);
  }, [cart]);

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + calculateSubtotal(item.price, item.quantity), 0);
  };

  const handleRemoveFromCart = (id) => {
    console.log("Removing item from cart:", id);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  const handleProceedToPayment = () => {
    console.log("Proceed to payment, isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      setShowPayPalButtons(true);
    } else {
      navigate("/signinscreen");
    }
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful");
    dispatch({ type: "CLEAR_CART" });
    setPaymentSuccess(true);
  };

  return (
    <Container className="mt-2">
      <h1 className="mb-3">Checkout</h1>
      {paymentSuccess && <Alert variant="success">Your order has been successfully paid.</Alert>}
      {cart.length === 0 && !paymentSuccess ? (
        <p>
          Your cart is empty. <Link to="/"><Button>Go back to shopping</Button></Link>
        </p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>ST</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.Img} alt={item.name} style={{ width: "70px" }} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${calculateSubtotal(item.price, item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bold">
                <td colSpan="4" className="text-end">Total:</td>
                <td>${calculateTotal().toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/">
              <Button className="btn">Continue Shopping</Button>
            </Link>
            <Button className="btn" onClick={handleProceedToPayment}>Proceed to Payment</Button>
          </div>
          {showPayPalButtons && (
            <div className="mt-3">
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calculateTotal().toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    handlePaymentSuccess();
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                }}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};
