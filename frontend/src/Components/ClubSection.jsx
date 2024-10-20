import React from "react";
import { Link } from "react-router-dom";
import clubs from "../assets/clubs.jpeg";

const ClubSection = () => {
  return (
    <section className="w-full my-5">
      <div className="w-clamp mx-auto text-left shadow-lg p-2 pb-4">
        <h2 className="text-3xl font-bold mb-6 md:text-center">
          Why Clubs are Essential in Engineering Colleges
        </h2>
        <p className="text-lg mb-4 ">
          Clubs play a crucial role in enhancing the college experience for
          engineering students. They provide opportunities for personal growth,
          skill development, and networking. Through clubs, students can explore
          their interests, collaborate on projects, and engage with peers who
          share similar passions.
        </p>
        <img
          src={clubs}
          alt="Engineering students collaborating in a club"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg mb-4">
          Being part of a club allows students to work on real-world problems,
          develop leadership skills, and make lasting friendships. These
          experiences are invaluable in preparing students for their future
          careers in engineering.
        </p>
        <Link
          to="/clubs"
          className=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Explore Our Clubs
        </Link>
      </div>
    </section>
  );
};

export default ClubSection;
