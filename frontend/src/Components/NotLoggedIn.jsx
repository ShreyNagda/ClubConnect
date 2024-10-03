import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <div className="flex flex-col min-h-screen items-center  justify-center">
      <div className="text-xl font-semibold">Not Logged in</div>
      <Link to={"/login"} className="bg-blue-400 px-4 py-2 rounded-sm">
        Log in
      </Link>
    </div>
  );
}

export default NotLoggedIn;
