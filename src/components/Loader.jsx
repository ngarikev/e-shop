import React from "react";
import { ClockLoader, HashLoader } from "react-spinners";

export default function Loader() {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <>
      <div style={loaderStyle}>
        <HashLoader color="#fe7d1b"  />
      </div>
    </>
  );
}
