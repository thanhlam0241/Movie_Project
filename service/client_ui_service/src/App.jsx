import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "@/utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "@/store/homeSlice";

import Home from "@/pages/home/Home";
import Details from "@/pages/details/Details";
import SearchResult from "@/pages/searchResult/SearchResult";
import Explore from "@/pages/explore/Explore";
import PageNotFound from "@/pages/404/PageNotFound";
import Authenticate from "@/pages/authenticate/authenticate";
import Favorite from "@/pages/favorite/Favorite";
import History from "@/pages/history/History";
import Recommend from "@/pages/recommend/Recommend";
import WatchMovie from "./pages/watch/watch";
import ProfilePage from "./pages/profile/index";

import Layout from "@/provider/layout";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
    console.log(auth);
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path=":mediaType/:id" element={<Details />} />
          <Route path="search/:query" element={<SearchResult />} />
          <Route path="explore" element={<Explore />} />
          <Route path="favourite" element={<Favorite />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="history" element={<History />} />
          <Route path="recommendation" element={<Recommend />} />
          <Route path="watch/:id" element={<WatchMovie />} />
        </Route>
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
