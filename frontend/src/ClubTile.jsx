import React from "react";
import { useNavigate } from "react-router-dom";

const ClubTile = ({ logo, name, year, onclick }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex justify-center flex-col"
      onClick={() => onclick()}
    >
      <img
        src={logo}
        alt={name}
        className="w-48 h-48 object-cover rounded-lg "
      />
      <h2 className="text-2xl font-bold mt-4 text-black truncate">{name}</h2>
      <h3 className="text-md text-[#000]">Since {year}</h3>
    </div>
  );
};

export default ClubTile;
