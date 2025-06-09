import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import Header from "../components/header/Header";
import TrendingContainer from "../components/trending/TrendingContainer";
import { PiPopcorn } from "react-icons/pi";
import { MdOutlineHowToVote } from "react-icons/md";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import { FaYoutube } from "react-icons/fa";
import SeeAllButton from "../components/buttons/SeeAllButton/SeeAllButton";
import TrailerButton from "../components/buttons/trailerButton/TrailerButton";

export default function Details() {
  const { type, id } = useParams();
  const [details, setDetails] = useState([]);
  async function getAllDetails() {
    let url = "";
    if (type.toUpperCase() === "MOVIE") {
      url = "https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR";
    } else {
      url = "https://api.themoviedb.org/3/tv/" + id + "?language=pt-BR";
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setDetails(data);
  }
  const [similar, setSimilar] = useState([]);
  async function getSimilarMovies() {
    let url = "";
    if (type.toUpperCase() === "MOVIE") {
      url =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "/similar?language=pt-BR&page=1";
    } else {
      url =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/similar?language=pt-BR&page=1";
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const itemsWithType = data.results.map((item) => ({
      ...item,
      media_type: "movie",
    }));
    setSimilar(itemsWithType);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllDetails();
    getSimilarMovies();
  }, [id, type]);

  const backdrop = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;

  const styleBanner = {
    backgroundImage: `url(${backdrop})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const poster = `https://image.tmdb.org/t/p/w500${details.poster_path}`;

  const stylePoster = {
    backgroundImage: `url(${poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [showHeaderContent, setShowHeaderContent] = useState(false);

  const releaseDate = details.release_date || details.first_air_date;
  const tagline = details.tagline;

  function renderStars(grade) {
    const stars = Math.round((grade / 10) * 5 * 2) / 2; // Arredonda para múltiplos de 0.5
    const full = Math.floor(stars);
    const half = stars % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {Array.from({ length: full }, (_, i) => (
          <TiStarFullOutline key={`full-${i}`} />
        ))}
        {half && <TiStarHalfOutline key="half" />}
        {Array.from({ length: empty }, (_, i) => (
          <TiStarOutline key={`empty-${i}`} />
        ))}
      </>
    );
  }

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins}min`;
  }

  return (
    <div>
      <div className="header-menu">
        <Header
          showContent={showHeaderContent}
          toggleHeaderContent={() => setShowHeaderContent((prev) => !prev)}
        />
      </div>
      <div className="banner-container">
        <div className="banner-gradient"></div>
        <div className="banner-image" style={styleBanner}></div>
      </div>
      <div className="center-container">
        <div className="movie-data">
          <div className="movie-poster" style={stylePoster}></div>
          <div className="vote-average">
            {renderStars(details.vote_average)}{" "}
            <p>{details.vote_average?.toFixed(1)}</p>
          </div>
          <div className="movie-stats">
            <div className="movie-popularity">
              <PiPopcorn className="stats-svg" />{" "}
              {details.popularity?.toFixed(2)}
            </div>
            <div className="movie-votes">
              <MdOutlineHowToVote className="stats-svg" /> {details.vote_count}{" "}
            </div>
          </div>
          <TrailerButton id={details.id} type={details.media_type || "movie"} />
        </div>
        <div className="movie-infos">
          <div className="movie-title">
            {details.title || details.name}
            <p>
              {details.number_of_seasons
                ? `${details.number_of_seasons} Temporadas`
                : formatRuntime(details.runtime)}
              {" - "}
              {releaseDate
                ? releaseDate.slice(0, 4)
                : "Data desconhecida"} -{" "}
              {details.genres?.map((genre) => genre.name).join(", ")}
            </p>
          </div>
          <div className="movie-director">
            Feito por
            <p>
              {details.created_by?.length
                ? details.created_by.map((creator) => creator.name).join(", ")
                : details.production_companies
                    ?.map((company) => company.name)
                    .join(", ")}
            </p>
          </div>
          <div className="movie-tagline">
            <div className="quote"></div>
            <p>{tagline ? details.tagline : "Tagline indisponível"}</p>
          </div>
          <div className="movie-overview">
            <p>{details.overview || "Resumo indisponível"}</p>
          </div>
        </div>
      </div>
      <div className="similar-movies-container">
        <div className="container-header">
          <p>Similares: </p>
          <SeeAllButton />
        </div>
        <TrendingContainer trendings={similar} />
      </div>
    </div>
  );
}
