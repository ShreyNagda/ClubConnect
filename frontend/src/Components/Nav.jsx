import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function NavLinks() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Events</NavLink>
      <NavLink to="/">Clubs</NavLink>
      <NavLink to="/">Societies</NavLink>
    </>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavBar = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="w-1/3 flex justify-end">
        <div className="hidden md:flex w-full justify-between">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleNavBar}
            className="hover:scale-105 transition-all "
          >
            {isOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <BiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col gap-3 items-center basis-full pt-5">
          <hr />
          <NavLinks />
        </div>
      )}
    </>
  );
}
