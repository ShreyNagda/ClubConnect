import { useEffect, useState } from "react";

import Carousel from "./Components/Carousel";
import About from "./Components/About";

function Home() {
  const [imageData, setImageData] = useState(null);

  return (
    <>
      <Carousel />
      <About />
    </>
  );
}

export default Home;
