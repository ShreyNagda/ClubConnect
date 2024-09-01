import { useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import FilledButton from "./FilledButton";
import OutlinedButton from "./OutlinedButton";
import NavLink from "./NavLink";

function Navbar() {
  console.log();
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    window.location.href.split("/").reverse()[0]
  );

  const handleNavClick = (open) => {
    setIsOpen(!open);
    navRef.current.classList.toggle("hidden");
  };

  const login = () => {
    console.log("Login");
  };
  const signup = () => {
    console.log("Signup");
  };

  return (
    <header
      className={`items-center px-5 py-5 bg-black  text-white font-lato min-h-[80px]`}
    >
      <div className="flex justify-between">
        <Link to={"/"} className="text-3xl font-bold">
          ClubConnect
        </Link>
        {/* Nav for Desktops */}
        <nav
          ref={navRef}
          className="hidden gap-5 items-center justify-end lg:flex"
        >
          <NavLink
            to={"/"}
            text={"Home"}
            selected={selectedItem == ""}
            onClick={() => {
              setSelectedItem("");
            }}
          />
          <NavLink
            to={"/clubs"}
            text={"Clubs"}
            selected={selectedItem == "clubs"}
            onClick={() => {
              setSelectedItem("clubs");
            }}
          />
          <NavLink
            to={"/societies"}
            text={"Societies"}
            selected={selectedItem == "societies"}
            onClick={() => {
              setSelectedItem("societies");
            }}
          />
          <FilledButton text="Login" onClick={() => login(true)} />
          <OutlinedButton text="Sign Up" onClick={() => signup(true)} />
        </nav>
        <button onClick={() => handleNavClick(isOpen)} className="lg:hidden">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Nav for mobile and tablets */}
      <nav
        ref={navRef}
        className="mt-2 w-full flex gap-5 items-center justify-center flex-col hidden transition-all duration-500 ease-in-out md:items-end"
      >
        <Link to={"/"} onClick={() => handleNavClick(true)}>
          Home
        </Link>
        <Link to={"/clubs"} onClick={() => handleNavClick(true)}>
          Clubs
        </Link>
        <Link to={"/"} onClick={() => handleNavClick(true)}>
          Societies
        </Link>
        <FilledButton
          text="Login"
          onClick={() => {
            handleNavClick(true);
            login();
          }}
        />
        <OutlinedButton
          text="Sign Up"
          onClick={() => {
            handleNavClick(true);
            signup();
          }}
        />
      </nav>
    </header>
  );
}

export default Navbar;
