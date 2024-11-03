import { NavLink, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose, IoPerson } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/GlobalContext";

function CheckRoleAndLink() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && user.client_role === "admin" && (
        <NavLink
          to="/admin"
          className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
        >
          Admin
        </NavLink>
      )}
      {user &&
        (user.client_role === "club_admin" ||
          user.client_role === "faculty") && (
          <NavLink
            to="/clubs/manage"
            className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
          >
            Manage Club
          </NavLink>
        )}
      {user ? (
        <NavLink
          to="/profile"
          className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400 flex gap-1 items-center"
        >
          <IoPerson />
          <p className="text-base">{user.name}</p>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
        >
          Login
        </NavLink>
      )}
    </>
  );
}

function AdminNavLinks() {
  return (
    <>
      <NavLink to="/" className="aria-[current=page]:text-blue-400">
        Home
      </NavLink>
      <NavLink
        to="/logout"
        className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
      >
        Logout
      </NavLink>
    </>
  );
}

function UserNavLinks() {
  return (
    <>
      <NavLink to="/" className="aria-[current=page]:text-blue-400">
        Home
      </NavLink>
      <NavLink to="/clubs" className="aria-[current=page]:text-blue-400">
        Clubs
      </NavLink>
      <NavLink to="/societies" className="aria-[current=page]:text-blue-400">
        Societies
      </NavLink>
      <CheckRoleAndLink />
    </>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isAdminPage = [
    "/admin",
    "/logout",
    "/clubs/manage",
    "/club/add",
  ].includes(location.pathname);

  const toggleNavBar = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="flex justify-end">
      <div className="hidden md:flex w-full justify-between items-center gap-3">
        {isAdminPage ? <AdminNavLinks /> : <UserNavLinks />}
      </div>
      <div className="md:hidden h-6">
        <button onClick={toggleNavBar}>
          {isOpen ? (
            <IoClose className="w-6 h-6" />
          ) : (
            <BiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <>
          <hr className="bg-slate-200 h-1 m-2 w-full" />
          <div className="flex flex-col gap-4 items-center basis-full">
            {isAdminPage ? <AdminNavLinks /> : <UserNavLinks />}
          </div>
        </>
      )}
    </nav>
  );
}
