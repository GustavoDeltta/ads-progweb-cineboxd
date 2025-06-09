import React from "react";
import "./TrendingContainer.css";
import TrendingCard from "./TrendingCard";

export default function TrendingContainer({ trendings }) {
  return (
    <div className="trending-container">
      {trendings.map((item) => (
        <TrendingCard
          key={item.id}
          backdrop={"https://image.tmdb.org/t/p/original/" + item.backdrop_path}
          id={item.id}
          type={item.media_type.toUpperCase()}
          title={item.title || item.name}
          release={
            item.release_date?.slice(0, 4) ||
            item.first_air_date?.slice(0, 4) ||
            "Desconhecido"
          }
          rating={item.vote_average.toFixed(1)}
          popularity={item.popularity.toFixed(2)}
          overview={item.overview}
        />
      ))}
    </div>
  );
}
