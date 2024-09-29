import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    toast.success(`Logout successful!`);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 min-h-screen">
      <div className="p-4 border shadow-md rounded-md flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold m-2">Logout</h2>
        <div className="text-lg">Are you sure you want to logout?</div>
        <div className="flex gap-4 items-center justify-center">
          <button className="p-2 w-[100px]" onClick={cancel}>
            Cancel
          </button>
          <button
            className="p-2 w-[100px] rounded-sm bg-red-400 w-100"
            onClick={logout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
