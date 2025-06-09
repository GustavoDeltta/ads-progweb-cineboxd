import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import AllCategoriesButton from "../components/subheader/AllCategoriesButton";
import "./Home.css";
import TrendingContainer from "../components/trending/TrendingContainer";
import SeeAllButton from "../components/buttons/SeeAllButton/SeeAllButton";
import MoviesCardContainer from "../components/cards/movieCard/MoviesCardContainer";

function Home() {
  const [trendings, setTrendings] = useState([]);

  async function getAllTrending() {
    const url = "https://api.themoviedb.org/3/trending/all/week?language=pt-BR";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setTrendings(data.results);
  }

  const [topRatedMovies, setTopRatedMovies] = useState([]);

  async function getTopRatedMovies() {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setTopRatedMovies(data.results);
  }

  const [topRatedSeries, setTopRatedSeries] = useState([]);

  async function getTopRatedSeries() {
    const url =
      "https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_TOKEN_TMDB,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setTopRatedSeries(data.results);
  }

  useEffect(() => {
    getAllTrending();
    getTopRatedMovies();
    getTopRatedSeries();
  }, []);

  const [showHeaderContent, setShowHeaderContent] = useState(true);

  return (
    <>
      <div className="header">
        <Header
          showContent={showHeaderContent}
        />
      </div>
      <div className="sub-header">
        <AllCategoriesButton />
      </div>
      <div className="trending-section">
        <div className="header-section">
          <p>Em alta no momento</p>
          <SeeAllButton />
        </div>
        <TrendingContainer trendings={trendings} />
      </div>
      <div className="top-rated-movies-section">
        <div className="header-section">
          <p>Filmes aclamados pela crítica</p>
          <SeeAllButton />
        </div>
        <div className="movies-section">
          <MoviesCardContainer topRatedMovies={topRatedMovies} />
        </div>
      </div>
      <div className="top-rated-series-section">
        <div className="header-section">
          <p>Series bem avaliadas</p>
          <SeeAllButton />
        </div>
        <div className="series-section">
          <MoviesCardContainer topRatedMovies={topRatedSeries} />
        </div>
      </div>
    </>
  );
}

export default Home;
