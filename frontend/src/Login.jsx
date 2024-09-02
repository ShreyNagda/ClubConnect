import React, { useState } from "react";
// import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 pl-2 text-sm text-black rounded-lg border border-[#000] focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 pl-2 text-sm text-black border border-[#000] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#337ab7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
