import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import Login from "./Login";
import Signup from "./Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Logout";
import Admin from "./Admin";
import Profile from "./Profile";
import AddClub from "./Components/AddClub";
import NotAnAdmin from "./Components/NotAnAdmin";
import NotLoggedIn from "./Components/NotLoggedIn";
import Clubs from "./Clubs";
import Society from "./Society";
import Club from "./Club";
import Societies from "./Societies";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

if (!document.cookie.includes("token")) {
  window.localStorage.removeItem("role");
}

function App() {
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          // className="!absolute !top-0 !right-0 m-4"
        />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/logout" Component={Logout} />
            <Route path="/signup" Component={Signup} />
            <Route path="/admin" Component={Admin} />
            <Route path="/club/add" Component={AddClub} />
            <Route path="/profile" Component={Profile} />
            <Route path="/clubs" Component={Clubs} />
            <Route path="/clubs/:id" Component={Club} />
            <Route path="/societies/:id" Component={Society} />
            <Route path="/societies" Component={Societies} />
            <Route path="/notanadmin" Component={NotAnAdmin} />
            <Route path="/notloggedin" Component={NotLoggedIn} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
