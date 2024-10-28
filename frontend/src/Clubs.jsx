import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Clubs() {
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (document.cookie.includes("token")) {
      const token = document.cookie.split("=")[1];
      const res = await axios.get(`/users/${token}`);
      return res.data;
    }
    return Error("Token not found");
  };

  const fetchData = async () => {
    const res = await axios.get("/clubs?type=club");
    return res.data;
  };

  const joinClub = async (club) => {
    if (!document.cookie.includes("token")) {
      navigate("/notloggedin");
    }
    try {
      const token = document.cookie.split("=")[1];
      const res = await axios.post(`/users/${token}/join-club`, {
        clubId: club._id,
      });
      toast.success(res.data["message"]);
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  const { data: clubs, error, loading } = useQuery("clubs", fetchData);
  const { data: user, errorUser, loadingUser } = useQuery("user", fetchUser);

  if (error) return <div>{error}</div>;
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading..
      </div>
    );
  return (
    <div className="p-2">
      <div className="text-2xl font-semibold my-2">Clubs</div>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {clubs &&
          clubs.length >= 0 &&
          clubs &&
          clubs.length >= 0 &&
          clubs.map((club) => (
            <div
              className="flex flex-col p-4 cursor-pointer border items-start rounded-sm shadow-lg"
              key={club._id}
            >
              <img
                src={club.logo}
                alt=""
                className="rounded-lg h-32 w-32 md:w-44 md:h-44"
              />
              <div className="text-xl font-bold">{club["name"]}</div>
              <div>{club["established_year"]}</div>
              <div className="flex w-full gap-2">
                <Link
                  to={`/clubs/${club._id}`}
                  className="bg-blue-400 w-full p-2 text-center rounded-sm"
                >
                  View
                </Link>

                {user && window.localStorage.getItem("role") === "user" && (
                  <>
                    {user &&
                    user["clubs"].map((c) => c._id).includes(club._id) ? (
                      <p className="text-blue-400 w-full text-center p-2 border-blue-500 border-2 rounded-sm">
                        Joined
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="bg-blue-400 w-full p-2 text-center rounded-sm"
                        onClick={() => joinClub(club)}
                      >
                        Join
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Clubs;
