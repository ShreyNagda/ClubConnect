import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AdminCarousel from "./Components/AdminCarousel";
import AdminClubs from "./Components/AdminClubs";

function Admin() {
  const [activeTab, setActiveTab] = useState("carousel");
  const [carouselImages, setCarouselImages] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie.includes("token")) {
      navigate("/notloggedin");
    }
    const role = window.localStorage.getItem("role");
    if (role !== "admin") navigate("/notanadmin");
  }, [window.localStorage.getItem("role")]);

  return (
    <>
      <div className="md:hidden flex min-h-screen items-center justify-center">
        Please access on a Computer
      </div>
      <div className="container mx-auto p-4 hidden md:block">
        <div className="flex justify-around mb-4">
          <button
            className={`py-2 px-4 ${
              activeTab === "carousel"
                ? "border-blue-400 border-2 rounded-sm"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab("carousel")}
          >
            Carousel Images
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "clubs"
                ? "border-blue-400 border-2 rounded-sm"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab("clubs")}
          >
            Clubs
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "users"
                ? "border-blue-400 border-2 rounded-sm"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </div>

        {activeTab === "carousel" && <AdminCarousel />}

        {activeTab === "clubs" && <AdminClubs />}
      </div>
    </>
  );
}

export default Admin;
