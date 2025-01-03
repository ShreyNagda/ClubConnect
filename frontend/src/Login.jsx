import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./Context/GlobalContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("auth/login", {
        email,
        password,
      });
      toast.success(`Login successfully as ${response.data.user.username}`);
      navigate("/");
      setUser(response.data.user);
    } catch (error) {
      toast.error(
        `Error logging in: ${error.response?.data.message || error.message}`
      );
    }
    reset();
  };

  function reset() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center flex-col gap-3 min-h-screen">
      <div className="p-4 border shadow-md rounded-md flex items-center justify-center flex-col w-4/5 md:w-1/3">
        <h2 className="text-2xl font-bold">Login</h2>
        <form
          className="flex flex-col gap-3 mt-5 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Enter email or username"
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
          <div className="md:text-md text-sm text-right">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-400">
              Signup
            </Link>
          </div>
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
