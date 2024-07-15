import "./style.scss";
import { useEffect, useState } from "react";
import movieAPI from "@/api/movie/movieAPI";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setRecommend } from "@/store/recommendSlice";

function RelateContent() {
  const [recommend, setRecommends] = useState([]);

  const [loading, setLoading] = useState(false);

  const { id } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.recommend);
  const dispatch = useDispatch();

  const fetchRecommend = () => {
    if (id == 0 || id) {
      console.log(items);
      if (!items || !items.length) {
        setLoading(true);
      }
      movieAPI
        .getRecommendation(id)
        .then((res) => {
          if (res && res.data) {
            if (res) dispatch(setRecommend({ data: res.data }));
          }
        })
        .catch((ex) => console.log(ex))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setRecommends(items);
  }, [items]);

  useEffect(() => {
    fetchRecommend();
  }, []);

  return (
    <div className="related-content">
      <h3>Recommend movies</h3>
      {loading && <div className="loading">...</div>}
      {!loading &&
        (!recommend || !Array.isArray(recommend) || !recommend.length) && (
          <div className="loading">No results</div>
        )}
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
