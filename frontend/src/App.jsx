import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="text-white font-roboto">
      <BrowserRouter>
        <Header />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" Component={Home} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
