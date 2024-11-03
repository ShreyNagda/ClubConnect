import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminCarousel from "./Components/AdminCarousel";
import AdminClubs from "./Components/AdminClubs";
import { AuthContext } from "./Context/GlobalContext";

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    window.localStorage.getItem("activeTab") || "carousel"
  );

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user && user.client_role !== "admin") {
      navigate("/notanadmin");
    }
  }, [user]);

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
            className={`py-2 px-4 transition-all ${
              activeTab === "carousel"
                ? "border-b-blue-400 border-b-2 rounded-sm"
                : "bg-transparent"
            }`}
            onClick={() => changeTab("carousel")}
          >
            Carousel Images
          </button>
          <button
            className={`py-2 px-4 transition-all ${
              activeTab === "clubs"
                ? "border-b-blue-400 border-b-2 rounded-sm"
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
