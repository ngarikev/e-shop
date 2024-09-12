import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
import { signOut } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import ModalButtons from "./ModalButtons";

export default function Header() {
  const { cart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { dispatch } = useCart();
  const [modalShow, setModalShow] = React.useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "CLEAR_CART" });
      navigate("/");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const getInitials = () => {
    if (userDetails.firstname && userDetails.lastname) {
      return (
        userDetails.firstname.charAt(0).toUpperCase() +
        userDetails.lastname.charAt(0).toUpperCase()
      );
    }
    return "";
  };

  return (
    <>
      <Navbar expand="lg" className="bg-nav position-sticky top-0 w-100 z-1">
        <NavbarBrand className="ms-5-lg ms-3">
          <Link className="text-decoration-none text-dark brand" to="/">
            Eshopify
          </Link>
        </NavbarBrand>
        <NavbarToggle arial-controls="basic-navbar-nav" className="me-3 " />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto  ">
            <Link className="text-decoration-none text-dark m-3" to="/checkout">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span>({totalItems})</span>}
            </Link>
          </Nav>
          <Nav>
            <Button className="searchIcon" variant="" onClick={() => setModalShow(true)}>
            <i className="fa-solid fa-magnifying-glass me-4"></i>
            </Button>

            <ModalButtons
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            
          </Nav>
          {!user ? (
            <>
              <Nav>
                <Link className="text-decoration-none m-3" to="/signinscreen">
                  <Button>Login</Button>
                </Link>
              </Nav>
              <Nav className="me-5">
                <Link className="text-decoration-none m-3" to="/signupscreen">
                  <Button >Sign Up</Button>
                </Link>
              </Nav>
            </>
          ) : (
            <div
            onMouseOver={() => setOpenUser(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setOpenUser(false); // Removed the condition
              }, 1000);
            }}
              // onMouseOver={() => setOpenUser(true)}
              // onMouseLeave={() => {
              //   setTimeout(() => {
              //     if (!second) {
              //       setOpenUser(false);
              //     }
              //   }, 1000);
              // }}
              className="position-relative me-5"
            >
              <div className="btn btn-dark rounded-circle text-uppercase">
                {getInitials()}
              </div>
              {openUser && (
                <div
                  className="dropdown-menu show position-absolute end-0 mt-2"
                  style={{ top: "100%" }}
                  onMouseEnter={() => setOpenUser(true)}
                  onMouseLeave={() => setOpenUser(false)}
                >
                  <div className="d-flex align-items-center p-3">
                    <div className="btn btn-dark rounded-circle text-uppercase me-2">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="mb-0">
                        {userDetails.firstname} {userDetails.lastname}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Button
                    onClick={handleLogout}
                    className="dropdown-item btn w-50 mx-auto text-center"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </NavbarCollapse>
      </Navbar>
    </>
  );
}
