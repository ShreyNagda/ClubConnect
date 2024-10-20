import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToggleButton from "./Common/ToggleButton";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role is "Student"

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("auth/register", {
        name,
        email,
        username,
        password,
        role,
        phone,
      });

      toast.success("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      toast.error(
        `Error signing up: ${error.response?.data.message || error.message}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 min-h-screen">
      <div className="p-4 border shadow-md rounded-md flex items-center justify-center flex-col w-full m-2 md:w-1/3 md:m-0">
        <h2 className="text-2xl font-bold">Signup</h2>
        <form
          className="flex flex-col gap-3 mt-5 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Enter your name"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Enter your username"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Enter email"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            placeholder="Enter phone"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Enter password"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            placeholder="Confirm password"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <ToggleButton
            onToggle={(value) => setRole(value.toLowerCase())}
            label1="Student"
            label2="Faculty"
            value={role}
          />
          <div className="text-md text-right">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-400">
              Login
            </Link>
          </div>
          <input
            type="submit"
            value="Signup"
            className="bg-black text-white p-1 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
