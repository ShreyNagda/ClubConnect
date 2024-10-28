import { Link } from "react-router-dom";

function NotAClubAdmin() {
  return (
    <div className="flex flex-col min-h-screen items-center  justify-center">
      <div className="text-xl font-semibold">Not a Club Admin</div>
      <Link to={"/"} className="bg-blue-400 px-4 py-2 rounded-sm">
        Return to Home
      </Link>
    </div>
  );
}

export default NotAClubAdmin;
