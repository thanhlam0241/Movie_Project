import "./style.scss";
import { useEffect, useState } from "react";
import movieAPI from "@/api/movie/movieAPI";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function RelateContent() {
  const [recommend, setRecommend] = useState([]);

  const { id } = useSelector((state) => state.auth);

  const fetchRecommend = async () => {
    if (id == 0 || id) {
      const data = await movieAPI.getRecommendation(id);
      if (data) {
        setRecommend(data.data);
      }
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);
  return (
    <div className="related-content">
      <h3>Recommended Videos</h3>
      {/* <div className="video">
        <img
          src="https://gamek.mediacdn.vn/133514250583805952/2021/5/21/e3d56-16213599314139-800-16215341089751571264192.jpg"
          alt="video thumbnail"
        />
        <div className="video-info">
          <p className="title">Transformer 1</p>
          <p className="view">11K lượt xem</p>
        </div>
      </div> */}
      {Array.isArray(recommend) &&
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
