import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

import { useSelector, useDispatch } from "react-redux";
import { setMovieInfo } from "@/store/movieInfoSlice";

import MoreInfo from "./MoreInfo";

import movieApi from '@/api/movieApi.js'

const Details = () => {
    const { mediaType, id } = useParams();

    // const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    // const { data: credits, loading: creditsLoading } = useFetch(
    //     `/${mediaType}/${id}/credits`
    // );

    const dispatch = useDispatch();

    const fetchData = async () => {
        const dataVideo
            = await movieApi.getMovieDetailVideoOfficials(id);
        const dataCredit
            = await movieApi.getMovieDetailCredits(id);
        dispatch(setMovieInfo({ credits: dataCredit, videosOfficial: dataVideo }));
    }

    useEffect(() => {
        fetchData();

        return () => {
            dispatch(setMovieInfo({ credits: [], videosOfficial: [] }));
        };
    }, [id]);

    return (
        <div>
            <DetailsBanner />
            <MoreInfo />
            <Similar mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
