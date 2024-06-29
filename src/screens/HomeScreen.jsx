import React from "react";
import Electronics from "../components/Electronics";
import Fashion from "../components/Fashion";
import Furnitures from "../components/Furnitures";
import Fragrances from "../components/Fragrances";
import Fitness from "../components/Fitness";
import Header from "../components/Header";
import Slide from "../components/Slide";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <Slide />
      <Fashion />
      <Fragrances />
      <Furnitures />
      <Fitness />
      <Electronics />
    </>
  );
}
