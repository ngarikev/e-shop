import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutScreen } from "./screens/CheckoutScreen.jsx";
import Loader from "./components/Loader.jsx";


const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));
const ProductScreen = lazy(() => import('./screens/ProductScreen.jsx'));
const SignupScreen = lazy(() => import('./screens/SignupScreen.jsx'));
const SigninScreen = lazy(() => import('./screens/SigninScreen.jsx'));
const SearchScreen = lazy(() => import('./screens/SearchScreen.jsx'));



function App() {
  return (
    <>
      <Router>
      <Suspense fallback={<Loader />}>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/signupscreen" element={<SignupScreen />} />
            <Route path="/signinscreen" element={<SigninScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/search" element={<SearchScreen />} />
          </Routes>
        </main>
      </Suspense>
        
      </Router>
    </>
  );
}

export default App;
