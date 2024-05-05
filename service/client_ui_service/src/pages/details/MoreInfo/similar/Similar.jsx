import Similar from "../../carousels/Similar";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
// import Img from "@/components/lazyLoadImage/Img";
// import avatar from "@/assets/avatar.png";

const SimilarMovies = () => {
    const { loading } = useSelector((state) => state.movieInfo);

    const { id } = useParams();

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                {!loading ? (
                    <Similar id={id} mediaType="movie" />
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default SimilarMovies;