import { useEffect, useState } from "react";

import Carousel from "./Components/Carousel";
import AboutSection from "./Components/AboutSection";
import HomeButtonContainer from "./Common/HomeButtonContainer";
import ClubSection from "./Components/ClubSection";
import SocietySection from "./Components/SocietySection";

function Home() {
  return (
    <>
      <Carousel />
      <AboutSection />
      {/* <HomeButtonContainer /> */}
      <ClubSection />
      <SocietySection />
    </>
  );
}

export default Home;
