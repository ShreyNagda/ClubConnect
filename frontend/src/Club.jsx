import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function Club() {
  const [id, setId] = useState(null);
  const fetchClub = async () => {
    const res = await axios.get(
      `/clubs/${window.location.pathname.split("/")[2]}`
    );
    setId(res.data._id);
    return res.data;
  };

  useEffect(() => {
    fetchClub();
  }, []);

  const { data: club, error, loading } = useQuery(`club${id}`, fetchClub);

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
            className="w-32 h-32 md:w-96 md:h-96 object-cover rounded-md"
          />
          <h1 className="text-2xl font-bold mt-2">{club.name}</h1>
          <div className="font-bold text-lg">Since {club.established_year}</div>
          <div className="prose prose-md">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              className="mt-1 max-w-3xl"
            >
              {club.description}
            </ReactMarkdown>
          </div>
          <p>{club.tags.join(", ")}</p>
          <div>
            Faculty Incharge
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
          </div>
          <div>
            <p>Events Conducted: 5 events</p>
          </div>
          <p>Past Core Teams: 2 teams</p>
        </div>
      )}
    </div>
  );
}

export default Club;
