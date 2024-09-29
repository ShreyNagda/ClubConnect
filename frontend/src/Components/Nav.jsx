import { NavLink, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

function CheckAdminAndLink() {
  return (window.localStorage.getItem("isAdmin") !== null) &
    (window.localStorage.getItem("isAdmin") === "true") ? (
    <NavLink
      to="/admin"
      className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
    >
      Admin
    </NavLink>
  ) : (
    <NavLink
      to="/profile"
      className="px-2 py-1 border-white border-2 text-white rounded-md !aria-[current=page]:text-blue-400 aria-[current=page]:border-blue-400"
    >
      Profile
    </NavLink>
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
      <NavLink to="/events" className="aria-[current=page]:text-blue-400">
        Events
      </NavLink>
      <NavLink to="/clubs" className="aria-[current=page]:text-blue-400">
        Clubs
      </NavLink>
      <NavLink to="/societies" className="aria-[current=page]:text-blue-400">
        Societies
      </NavLink>
      {window.localStorage.getItem("token") !== null ? (
        <CheckAdminAndLink />
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

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" || location.pathname === "/logout";

  const toggleNavBar = () => setIsOpen(!isOpen);
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
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
      </nav>
      {isOpen && (
        <>
          <hr className="bg-slate-200 h-1 m-2 w-full" />
          <div className="flex flex-col gap-4 items-center basis-full">
            {isAdminPage ? <AdminNavLinks /> : <UserNavLinks />}
          </div>
        </>
      )}
    </>
  );
}
