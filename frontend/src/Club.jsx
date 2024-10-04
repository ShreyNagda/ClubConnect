import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Club() {
  // const [club, setClub] = useState(null);
  const fetchClub = async () => {
    console.log(window.location.pathname);
    const res = await axios.get(
      `/clubs/${window.location.pathname.split("/")[2]}`
    );
    return res.data;
  };

  useEffect(() => {
    fetchClub();
  }, []);

  const { data: club, error, loading } = useQuery("club", fetchClub);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  return (
    <div className="flex items-center">
      {!club && (
        <div className="flex flex-col gap-2">
          <div>No Club found</div>
          <Link className="bg-blue-400 px-4 py-2">Go Back</Link>
        </div>
      )}
      {club && (
        <div className="flex flex-col p-4">
          <img
            src={club.logo}
            alt={club.name}
            className="w-32 h-32 md:w-96 md:h-96 object-cover"
          />
          <h1 className="text-2xl font-bold mt-2">{club.name}</h1>
          <div className="font-bold text-lg">Since {club.established_year}</div>
          <p className="mt-1">{club.description}</p>
          <p>{club.tags.join(", ")}</p>
          <div className="flex gap-1">
            {club.faculty_incharge.map((faculty) => (
              <div
                key={faculty._id}
                className="bg-slate-400 py-1 px-2 rounded-sm"
              >
                {faculty.name}
              </div>
            ))}
          </div>
          <p>Events Conducted: {club.events_conducted.length} events</p>
          <p>Past Core Teams: {club.past_core_teams.length} teams</p>
        </div>
      )}
    </div>
  );
}

export default Club;
