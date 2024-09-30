import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // Handle success (e.g., save token, redirect, etc.)
      console.log("Login successful:", response);
      toast.success(`Login successfully as ${response.data.user.username}`);
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("isAdmin", response.data.user.isAdmin);
      navigate("/");
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error(
        `Error logging in: ${error.response?.data.message || error.message}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 min-h-screen">
      <div className="p-4 border shadow-md rounded-md flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
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
            type="submit"
            value="Login"
            className="bg-black text-white p-1 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
