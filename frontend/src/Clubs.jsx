import React from "react";
import "./Clubs.css";

function Clubs() {
  return (
    <div className="clubs-container">
      <header>
        <h1>Clubs</h1>
      </header>
      <section className="about-clubs">
        <h2>About Our Clubs</h2>
        <p>
          At our college, students have the opportunity to join a wide range of
          clubs that cater to diverse interests and passions. Whether you're
          into technology, arts, sports, or cultural activities, our clubs
          provide a platform for you to explore, learn, and grow outside the
          classroom. Join a club today to connect with like-minded peers and
          enhance your campus life!
        </p>
      </section>
      <section className="club-tiles">
        <div className="row">
          <div className="club-tile">
            <img src="club1-logo.jpg" alt="Club 1 Logo" />
            <h3>
              <a href="/club1">Club 1</a>
            </h3>
          </div>
          <div className="club-tile">
            <img src="logo2.png" alt="Club 2 Logo" />
            <h3>
              <a href="/club2">Club 2</a>
            </h3>
          </div>
          <div className="club-tile">
            <img src="logo3.png" alt="Club 3 Logo" />
            <h3>
              <a href="/club3">Club 3</a>
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clubs;
