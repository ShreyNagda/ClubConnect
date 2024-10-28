import React from "react";
import { Link } from "react-router-dom";

const SocietySection = () => {
  return (
    <section className="w-full my-5">
      <div className="w-clamp mx-auto text-left shadow-lg p-2 pb-4">
        <h2 className="text-3xl font-bold mb-6 md:text-center ">
          Why Professional Societies are Essential in Engineering Colleges
        </h2>
        <p className="text-lg mb-4">
          Professional societies provide engineering students with the
          opportunity to connect with industry professionals, attend workshops,
          and gain exposure to the latest technological advancements. These
          societies foster a strong professional network and create
          opportunities for mentorship and internships.
        </p>
        <img
          src="https://images.unsplash.com/photo-1518933165971-611dbc9c412d"
          alt="Professional Society event in progress"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg mb-4">
          By joining a professional society, students can stay updated with
          industry trends, earn certifications, and develop their technical and
          leadership skills. It is a vital step toward preparing for a
          successful career in engineering.
        </p>
        <Link
          to="/societies"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Explore Our Professional Societies
        </Link>
      </div>
    </section>
  );
};

export default SocietySection;
