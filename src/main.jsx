import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./Context/CartContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const clientId = process.env.VITE_REACT_APP_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <UserProvider>
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <App />
      </PayPalScriptProvider>
      <ToastContainer />
    </UserProvider>
  </CartProvider>
);
