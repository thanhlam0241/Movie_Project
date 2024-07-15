import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
      <ContentWrapper>
        <Link to="/" className="backToHome">
          Back to Home
        </Link>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
