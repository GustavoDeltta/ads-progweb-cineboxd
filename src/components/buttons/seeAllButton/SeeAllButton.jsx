import React, { useState } from "react";
import "./SeeAllButton.css";
import UnderConstruction from "../../popups/UnderConstruction";

export default function SeeAllButton() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <button className="seeall-button" onClick={handleClick}>
        Ver todos
      </button>
      {showPopup && (
        <UnderConstruction onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
