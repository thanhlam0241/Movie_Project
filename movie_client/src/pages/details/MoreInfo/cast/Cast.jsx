import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Img from "@/components/lazyLoadImage/Img";
import avatar from "@/assets/avatar.png";

const Cast = () => {
    const { url } = useSelector((state) => state.home);

    const { credits, loading } = useSelector((state) => state.movieInfo);

    console.log(credits)

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
                <div className="sectionHeading">Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {credits?.cast && credits?.cast?.length > 0 && credits?.cast?.map((item, index) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={index + '-' + item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                <div className="sectionHeading">Crew</div>
                {!loading ? (
                    <div className="listItems">
                        {credits?.crew && credits?.crew?.length > 0 && credits?.crew?.map((item, index) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={index + '-' + item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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

export default Cast;
