import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AdminCarousel from "./Components/AdminCarousel";
import AdminClubs from "./Components/AdminClubs";

function Admin() {
  const [activeTab, setActiveTab] = useState(
    window.localStorage.getItem("activeTab") || "carousel"
  );
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

  function changeTab(tab) {
    setActiveTab(tab);
    window.localStorage.setItem("activeTab", tab);
  }

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
            onClick={() => changeTab("carousel")}
          >
            Carousel Images
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "clubs"
                ? "border-blue-400 border-2 rounded-sm"
                : "bg-transparent"
            }`}
            onClick={() => changeTab("clubs")}
          >
            Clubs / Societies
          </button>
        </div>

        {activeTab === "carousel" && <AdminCarousel />}

        {activeTab === "clubs" && <AdminClubs />}
      </div>
    </>
  );
}

export default Admin;
