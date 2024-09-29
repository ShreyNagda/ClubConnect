import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AdminCarousel from "./Components/AdminCarousel";

function Admin() {
  const [activeTab, setActiveTab] = useState("carousel");
  const [carouselImages, setCarouselImages] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const isAdmin = window.localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/");
  }, [window.localStorage.getItem("isAdmin")]);

  const handleEditClick = (image) => {
    setCurrentImage(image);
    setEditModalOpen(true);
  };

  const handleDeleteClick = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      await axios.delete(`/api/carousel-images/${imageId}`); // Replace with your API endpoint
      setCarouselImages(carouselImages.filter((image) => image.id !== imageId));
    }
  };

  const handleUpdateImage = async () => {
    await axios.patch(`/api/carousel-images/${currentImage.id}`, currentImage); // Replace with your API endpoint
    setEditModalOpen(false);
    setCurrentImage(null);
    // Re-fetch images to update state
    const response = await axios.get("/api/carousel-images");
    setCarouselImages(response.data);
  };

  return (
    <div className="container mx-auto p-4">
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

      {activeTab === "clubs" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Clubs</h2>
          <p>No clubs available yet.</p>
          {/* You can replace this with your clubs data */}
        </div>
      )}
    </div>
  );
}

export default Admin;
