import { useEffect, useState } from "react";
import { clubs } from "../utils/data";

function ClubPage() {
  const slug = window.location.href.split("/").reverse()[0];
  const [data, setData] = useState({});
  useEffect(() => {
    clubs.map((club) => {
      if (club.slug == slug) {
        setData(club);
      }
    });
  }, []);
  console.log(data);

  return (
    <div>
      <img src={data.logo} alt="" />
      <h2>{data.name}</h2>
    </div>
  );
}
export default ClubPage;
