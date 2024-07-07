import "./style.scss";
import { useEffect, useState } from "react";
import movieAPI from "@/api/movie/movieAPI";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";

function RelateContent() {
  const [recommend, setRecommend] = useState([]);

  const [loading, setLoading] = useState(true);

  const { id } = useSelector((state) => state.auth);

  const fetchRecommend = () => {
    if (id == 0 || id) {
      setLoading(true);
      movieAPI
        .getRecommendation(id)
        .then((res) => {
          if (res && res.data) {
            setRecommend(res.data);
          }
        })
        .catch((ex) => console.log(ex))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);
  return (
    <div className="related-content">
      <h3>Recommended Videos</h3>
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
          return (
            <Skeleton
              key={"skeleton" + index}
              height={100}
              width={200}
              variant="rectangular"
            />
          );
        })}
      {!loading &&
        recommend &&
        Array.isArray(recommend) &&
        recommend.length > 0 &&
        recommend.map((item) => {
          return (
            <Link to={`/movie/${item.id}`} key={item.id} className="video">
              <img src={item.poster_path} alt="video thumbnail" />
              <div className="video-info">
                <p className="title">{item.title || ""}</p>
                <p className="view">{item.vote_average || 0} scores</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default RelateContent;
