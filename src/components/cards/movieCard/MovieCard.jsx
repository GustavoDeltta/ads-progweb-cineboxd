import React, { useState } from "react";
import "./MovieCard.css";
import { TbInfoSquareRounded } from "react-icons/tb";
import TrailerButton from "../../buttons/trailerButton/TrailerButton";
import { PiPopcorn } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function MovieCard({
  id,
  type,
  poster,
  backdrop,
  title,
  release,
  popularity,
  vote_average,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const styleObject = {
    backgroundImage: isHovered ? `url(${backdrop})` : `url(${poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/details/${type}/${id}`);
  };
  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-banner" style={styleObject}>
        <p>{title}</p>
      </div>
      <div className="movie-options">
        <p className="release-info"> {release} </p>
        <p className="stats-info">
          {" "}
          <PiPopcorn /> {popularity}{" "}
        </p>
        <p className="stats-info">
          {" "}
          <TiStarFullOutline /> {vote_average}{" "}
        </p>
        <button className="movie-details" onClick={handleDetailsClick}>
          <TbInfoSquareRounded className="details-infos" />
        </button>
      </div>
    </div>
  );
}
