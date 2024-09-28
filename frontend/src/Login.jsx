import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mailSent, setMailSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status == 201) {
          setMailSent(true);
        } else if (res.status == 200) {
          navigate("/");
        }
      });
  };

  return (
    <div className="container mx-auto p-4 pt-6 w-[90%] md:w-[70%] lg:w-[50%] ">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <img
            src="/path-to-your-logo.png"
            alt="College Logo"
            className="w-20 h-20"
          />
        </div>
        {mailSent && (
          <div className="text-black">Verification mail sent to {email}</div>
        )}
        {!mailSent && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              {<p className="text-red-400">{error}</p>}
              <input
                type="email"
                placeholder="Email"
                className="p-2 pl-2 text-sm text-black rounded-lg border border-[#000] focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 pl-2 text-sm text-black border border-[#000] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-[#337ab7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
            >
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
