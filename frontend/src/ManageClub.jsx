import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/GlobalContext";
import axios from "axios";

function ManageClub() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clubData, setClubData] = useState(null);

  async function getClub() {
    const res = await axios.get(`/clubs/${user.club_id}`);
    setClubData(res.data);
  }

  useEffect(() => {
    if (user == null) {
      navigate("/notloggedin");
    }
    if (
      user &&
      user.client_role !== "club_admin" &&
      user.client_role !== "faculty"
    ) {
      console.log("not a club admin");
      navigate("/notaclubadmin");
    }
  }, []);

  useEffect(() => {
    if (user && user.club_id) {
      getClub();
    }
  }, [user]);

  console.log(user);

  return (
    <>
      <div>Manage Club</div>
      <div>
        {user && user._id} {user && user.name}
      </div>
      <div>{clubData && clubData.name}</div>
      <aside></aside>
    </>
  );
}
export default ManageClub;
