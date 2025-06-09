import React from "react";
import './TrailerButton.css'
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

export default function TrailerButton({ id, type }) {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    if (!id || !type) return;

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?language=pt-BR`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TMDB}`,
            },
          }
        );
        const data = await res.json();

        const trailer = data.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    };

    fetchTrailer();
  }, [id, type]);

  const handleClick = () => {
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    }
  };

  return (
    <div
      className="trailer-button"
      onClick={handleClick}
      style={{ cursor: trailerUrl ? "pointer" : "default" }}
    >
      <FaYoutube className="youtube-svg" />
      <p>Trailer</p>
    </div>
  );
}
