import { useEffect, useState } from "react";

import Carousel from "./Components/Carousel";

function Home() {
  const [imageData, setImageData] = useState(null);

  return (
    <>
      <Carousel />
    </>
  );
}

export default Home;
