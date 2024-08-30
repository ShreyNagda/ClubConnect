import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center p-2">
      <div className="text-3xl font-semibold font-sans">Nexus</div>
      <ul className="flex gap-3">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
      </ul>
      <div className="flex gap-3">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
