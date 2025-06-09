import React from "react";
import MovieCard from "./MovieCard";
import './MovieCardContainer.css'

export default function MoviesCardContainer({topRatedMovies}) {
  return (
    <div className="movies-container">
      {topRatedMovies.map((item) => (
        console.log(item),
        <MovieCard
          key={item.id}
          id={item.id}
          type={item.first_air_date ? "tv" : "movie"}
          backdrop={"https://image.tmdb.org/t/p/original" + item.backdrop_path}
          poster={"https://image.tmdb.org/t/p/original" + item.poster_path}
          title={item.title || item.name}
          release={(item.first_air_date || item.release_date)?.slice(0, 4)}
          popularity={item.popularity.toFixed(2)}
          vote_average={item.vote_average.toFixed(1)}
        />
      ))}
    </div>
  );
}
