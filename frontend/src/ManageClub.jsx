import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManageClub() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("role") !== "club_admin")
      navigate("/notaclubadmin");
  }, []);
  const token = window.location.pathname.split("/")[2];
  return <>Manage Club</>;
}
export default ManageClub;
