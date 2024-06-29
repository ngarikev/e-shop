import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SigninScreen from "./screens/SigninScreen.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import { CheckoutScreen } from "./screens/CheckoutScreen.jsx";
import SearchScreen  from "./screens/SearchScreen.jsx";

function App() {
  return (
    <>
      <Router>
      
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/signupscreen" element={<SignupScreen />} />
            <Route path="/signinscreen" element={<SigninScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/search" element={<SearchScreen />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
