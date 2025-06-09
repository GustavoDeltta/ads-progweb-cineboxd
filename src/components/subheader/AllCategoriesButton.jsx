import React, { useState } from "react";
import "./AllCategoriesButton.css";
import { TbCategory } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import UnderConstruction from "../popups/UnderConstruction";

export default function AllCategoriesButton() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };
  return (
    <>
      <button className="allcategories-button" onClick={handleClick}>
        <TbCategory className="allcategories-svg" />
        <span>All Categories</span>
        <RiArrowDropDownLine className="dropdown-svg" />
      </button>
      {showPopup && <UnderConstruction onClose={() => setShowPopup(false)} />}
    </>
  );
}
