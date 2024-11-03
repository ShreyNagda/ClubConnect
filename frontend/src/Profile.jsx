import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { AuthContext } from "./Context/GlobalContext";

function Profile() {
  const { user } = useContext(AuthContext);

  function formatClientRole(role) {
    if (user) {
      if (role.split("_").length > 0) {
        return role
          .split("_")
          .map((word) => word[0].toUpperCase() + word.substring(1))
          .join(" ");
      } else {
        role[0].toUpperCase() + role.substring(1);
      }
    }
  }

  console.log(user);

  const isLinkClickable = user && user.client_role === "student";
  if (!user || user === null) {
    return <div>Not logged in</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="rounded-full w-32 h-32 overflow-hidden border-2 border-gray-300 shadow-md p-5">
        {user && user.profile_pic !== undefined ? (
          <img src={user.profile_pic} alt="profile" />
        ) : (
          <IoMdPerson className="w-full h-full text-gray-400" />
        )}
      </div>
      <div className="text-lg font-semibold mt-4">{user["name"]}</div>
      <div className="text-gray-500">@{user["username"]}</div>
      <a href={`mailto:${user["email"]}`}>{user["email"]}</a>
      {user["client_role"] !== "student" && (
        <div className="text-gray-500 mt-2">
          {user.client_role && formatClientRole(user.client_role)}
        </div>
      )}

      <div className="mt-4 border-t border-gray-300 pt-4 w-full md:w-1/2 lg:w-1/4">
        <div className="text-gray-500">Clubs or Societies</div>
        {user["clubs"].length === 0 ? (
          <div className=" md:flex">
            <div>
              No{" "}
              <Link
                to={isLinkClickable ? "/clubs" : null}
                className="text-blue-400 inline-block mx-1"
              >
                Clubs
              </Link>{" "}
              or{" "}
              <Link
                to={isLinkClickable ? "/societies" : null}
                className="text-blue-400 inline-block mx-1"
              >
                Societes
              </Link>{" "}
              joined.
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4">
              {user["clubs"].map((club) => (
                <Link
                  key={club._id}
                  to={`/clubs/${club._id}`}
                  className="flex flex-col items-center bg-white shadow-md rounded-md p-4 hover:bg-gray-100"
                >
                  <img src={club.logo} className="h-16 w-16 mx-auto" />
                  <div className="text-sm font-medium mt-2">{club.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 border-t border-gray-300 pt-4 w-full md:w-1/2 lg:w-1/4">
        <div className="text-gray-500 mb-2">Events Attended</div>
        {user["events"].length <= 0 ? (
          <div className="w-full">
            No{" "}
            <Link
              to={isLinkClickable ? "/events" : null}
              className="text-blue-400 inline-block mx-1"
            >
              Events
            </Link>{" "}
            attended
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {user["events_attended"].map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="flex flex-col items-center bg-white shadow-md rounded-md p-4 hover:bg-gray-100"
              >
                <img src={event.banner} className="h-16 w-16 mx-auto" />
                <div className="text-sm font-medium mt-2">{event.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link
        to={"/logout"}
        className="bg-blue-400 px-4 py-2 rounded-sm mt-4 text-white"
      >
        Logout
      </Link>
    </div>
  );
}

export default Profile;
