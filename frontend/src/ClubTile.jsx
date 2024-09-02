import React from "react";

const ClubTile = ({ logo, name, year}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={logo} alt={name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="text-lg font-bold mt-4">{name}</h2>
      <h3 className="text-sm text-gray-600">Since {year}</h3>
    </div>
  );
};

export default ClubTile;