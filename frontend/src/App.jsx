import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import Clubs from "./Clubs";
import Societies from "./Societies";
import Footer from "./Components/Footer";
import ClubPage from "./Components/ClubPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="bg-black34 text-white min-h-nav-screen font-roboto">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/clubs" Component={Clubs} />
            <Route path="/societies" Component={Societies} />
            <Route path="/clubs/:slug" Component={ClubPage} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
