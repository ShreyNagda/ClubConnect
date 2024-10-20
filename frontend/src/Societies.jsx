import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Societies() {
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (document.cookie.includes("token")) {
      const token = document.cookie.split("=")[1];
      const res = await axios.get(`/users/${token}`);
    }
  };

  const fetchData = async () => {
    const res = await axios.get("/clubs?type=society");
    // console(res);
    return res.data;
  };

  const viewClub = (club) => {
    navigate(`/societies/${club._id}`);
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
      toast.error(
        `Error logging in: ${error.response?.data.message || error.message}`
      );
    }
  };
  const { data: clubs, error, loading } = useQuery("societies", fetchData);
  const { data: user, errorUser, loadingUser } = useQuery("user", fetchData);

  if (error) return <div>{error}</div>;
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading..
      </div>
    );

  return (
    <div className="p-2">
      <div className="text-2xl font-semibold my-2">Societies</div>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {clubs && clubs.length <= 0 && <div>No Societies</div>}
        {clubs &&
          clubs.length >= 0 &&
          clubs &&
          clubs.length >= 0 &&
          clubs.map((club) => (
            <div
              className="flex flex-col p-4 cursor-pointer border rounded-sm shadow-lg items-start"
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
                <button
                  type="button"
                  className="bg-blue-400 w-full p-2 text-center"
                  onClick={() => viewClub(club)}
                >
                  View
                </button>
                {window.localStorage.getItem("role") === "user" && (
                  <button
                    type="button"
                    className="bg-blue-400 w-full p-2 text-center"
                    onClick={() => joinClub(club)}
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Societies;
