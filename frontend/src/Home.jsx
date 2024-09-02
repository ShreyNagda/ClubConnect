import { Link } from "react-router-dom";
import CarouselItem from "./Components/CarouselItem";
import { useEffect, useState } from "react";

import FilledButton from "./Components/FilledButton";
import { Post } from "./Components/Post";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    { image: "4.jpg", text: "Title 1" },
    { image: "5.jpg", text: "Title 2" },
    { image: "3.jpg", text: "Title 3" },
  ];
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    var interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-[70%] self-center">
        <div className="p-2 md:pd-3 lg:pd-4">
          {/* <div className="p-5"></div> */}
          <div className="flex gap-5 items-center justify-center">
            <FilledButton
              text="&lt;"
              onClick={() => prevSlide()}
              className={"hidden md:block lg:block"}
            />
            <CarouselItem
              item={items[currentIndex]}
              className="transition-all ease-in-out"
            />
            <FilledButton
              text="&gt;"
              onClick={() => nextSlide()}
              className={"hidden md:block lg:block"}
            />
          </div>
          <section className="p-2 md:pd-3 lg:pd-4">
            <h2 className="py-3 text-3xl font-bold ">About APSIT</h2>
            <p>
              AP Shah Institute of Technology (APSIT), Thane, offers
              NBA-accredited engineering programs in Civil, Mechanical, Computer
              Engineering, and Information Technology. The institute is
              recognized by STEM USA for its commitment to modern pedagogical
              practices. APSIT has also introduced specialized courses in
              Computer Science & Engineering with a focus on Artificial
              Intelligence, Machine Learning, and Data Science. To enhance
              learning, the institute uses the Moodle LMS for online resources,
              lectures, and assessments. Students benefit from initiatives like
              eBooks, NPTEL courses, IIT-designed tutorials, and foreign
              language programs, fostering a well-rounded education.
            </p>
          </section>
          <section className="p-2 md:pd-3 lg:pd-4">
            <h2 className="py-3 text-3xl font-bold ">Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Post src={"p4.jpg"} text={"NSS"} />
              <Post src={"p1.jpg"} text={"DSA Club"} />
              <Post src={"p2.jpg"} text={"Cyber Security Club"} />
              <Post src={"p3.jpg"} text={"CSA Club"} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
