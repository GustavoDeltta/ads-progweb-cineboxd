import React, { useState } from "react";
import "./Header.css";
import { BiSolidMovie } from "react-icons/bi";
import { AiFillFire } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { ImVideoCamera } from "react-icons/im";
import UnderConstruction from "../popups/UnderConstruction";

export default function header({ showContent, toggleHeaderContent }) {
  
  const containerStyle = {
    width: showContent ? "calc(100% - 40px)" : "100px",
    transition: "width 0.3s ease-in-out"
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="header-container" style={containerStyle}>
      <div className={`header-left ${showContent ? "flex-1" : ""}`}>
        <button className="header-logo" onClick={toggleHeaderContent}>
          <ImVideoCamera className="header-logo-svg" />
        </button>
      </div>
      {showContent && (
        <>
          <div className="header-center">
            <button className="header-button" id="movie-button" onClick={handleClick}>
              <BiSearchAlt className="header-button-svg" />
              <input type="text" placeholder="Pesquise aqui!" />
            </button>
            <button className="header-button" id="movie-button" onClick={handleClick}>
              <AiFillFire className="header-button-svg" />
              <span>Em Alta</span>
            </button>
            <button className="header-button" id="movie-button" onClick={handleClick}>
              <BiSolidMovie className="header-button-svg" />
              <span>Filmes</span>
            </button>
            <button className="header-button" id="movie-button" onClick={handleClick}>
              <TbMovie className="header-button-svg" />
              <span>Séries</span>
            </button>
          </div>
          <div className="header-right"></div>
          {showPopup && <UnderConstruction onClose={() => setShowPopup(false)} />}
        </>
      )}
    </div>
  );
}
