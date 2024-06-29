import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalButtons from "./ModalButtons";

export default function Slide() {
  const Data = [
    {
      Img: "../images/Fashion1.2.png",
    },
    {
      Img: "../images/Fashion1.0.png",
    },
  ];
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="slider-container  hero">
        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {Data.map((product, index) => (
            <div key={index} className="position-relative ">
              <img
                src={product.Img}
                alt="about image"
                className="img-fluid w-100"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="position-absolute border rounded hero-card top-50 start-0 ms-5 text-white">
        <h2 className="text-center mt-5">We Sell</h2>
        <div>
          <Button className="m-3" variant="primary" onClick={() => setModalShow(true)}>
            Search
          </Button>

          <ModalButtons show={modalShow} onHide={() => setModalShow(false)} />
          <Link to="/">
            <Button className="m-5">Products</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
