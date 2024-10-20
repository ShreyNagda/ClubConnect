import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

function Profile() {
  async function fetchUserData() {
    const token = document.cookie.split("=")[1];
    const res = await axios.get(`/users/${token}`);
    return res.data;
  }
  const {
    data: user,
    error,
    loading,
    refetch,
  } = useQuery("user", fetchUserData);

  if (!document.cookie.includes("token")) {
    return <>Login to view your profile</>;
  }
  if (loading) return <div>{loading}</div>;
  if (error) return <div>{error}</div>;
  if (!user) {
    return <>User not found</>;
  }

  return (
    <div className="p-4 flex flex-col items-start">
      <div className="rounded-full w-32 h-32 my-4 p-3 border-2 border-black">
        {!user.profile_pic && <IoMdPerson className="w-full h-full " />}
        {user.profile_pic && <img src={user.profile_pic} alt="profile" />}
      </div>
      <div className="text-lg font-semibold">{user["name"]}</div>
      <div>@{user["username"]}</div>
      <a href={`mailto:${user["email"]}`}>{user["email"]}</a>
      {user["client_role"] !== "student" && (
        <div>
          {user["client_role"][0].toUpperCase() +
            user["client_role"].substring(1)}
        </div>
      )}
      {user["client_role"] === "student" && user["clubs"].length === 0 ? (
        <div className="flex gap-2">
          <p>No Clubs or Societies joined. Join</p>
          <Link to={"/clubs"} className="text-blue-400">
            Clubs
          </Link>
          or
          <Link to={"/clubs"} className="text-blue-400">
            Societes
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      <Link to={"/logout"} className="bg-blue-400 px-4 py-2 rounded-sm mt-4">
        Logout
      </Link>
    </div>
  );
}

export default Profile;
