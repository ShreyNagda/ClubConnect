import React from "react";
import ClubTile from "./Components/ClubTile";
import { useNavigate } from "react-router-dom";
import { clubs } from "./utils/data";

function Clubs() {
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <header className="p-3 bg-[#337ab7]">
        <h2 className="text-3xl font-bold">Clubs</h2>
      </header>
      <section className="p-3">
        <h2 className="text-2xl font-semibold py-1">About Our Clubs</h2>
        <img src="club1-logo.png" alt="" />
        <p>
          At our college, students have the opportunity to join a wide range of
          clubs that cater to diverse interests and passions. Whether you're
          into technology, arts, sports, or cultural activities, our clubs
          provide a platform for you to explore, learn, and grow outside the
          classroom. Join a club today to connect with like-minded peers and
          enhance your campus life!
        </p>
      </section>
      <section className="p-3">
        <h2 className="text-2xl font-semibold py-2">Our Clubs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-center gap-3">
          {clubs.map((club) => (
            <ClubTile
              key={club.name}
              name={club.name}
              logo={club.logo}
              year={club.year}
              onclick={() => {
                navigate(`/clubs/${club.slug}`);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Clubs;
