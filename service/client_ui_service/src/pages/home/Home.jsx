import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Recommend from "./recommend/Recommend";
import Latest from "./latest/latest";
import TopRate from "./toprate/index";

import { useSelector } from "react-redux";

const Home = () => {
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <div className="homePage">
      <HeroBanner />
      {isLogin && <Recommend />}
      <Popular />
      <Trending />
      <TopRate />
      <Latest />
      {/* <TopRated /> */}
    </div>
  );
};

export default Home;
