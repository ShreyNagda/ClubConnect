import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Fun from "../assets/fun.jpg";
import { Link } from "react-router-dom";

function Carousel() {
  const fetchData = async () => {
    return axios.get("carousel/").then((res) => res.data);
  };

  const autoSlideInterval = 3000; // Automatic slide interval set to 3 seconds

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch the images data
  const { data: images, error, isLoading } = useQuery("imagesData", fetchData);

  // Ensure the effect for auto sliding runs only when images are available
  useEffect(() => {
    let timer;
    if (!isPaused && images?.length) {
      timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoSlideInterval);
    }
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [currentIndex, isPaused, images, autoSlideInterval]);

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };

  // Function to go to the previous slide
  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    resetTimer();
  };

  // Reset the timer on user interaction
  const resetTimer = () => {
    setIsPaused(true); // Pause the auto-slide temporarily
    setTimeout(() => setIsPaused(false), 1000); // Resume auto-slide after 1 second
  };

  if (isLoading)
    return (
      <div>
        <img
          src={Fun}
          alt=""
          className="w-full object-cover h-60 md:h-96 overflow-hidden lg:rounded-md"
        />
      </div>
    );
  if (error) return <div>Error loading carousel data!</div>;

  return (
    <div className="relative top-[0px]  w-full max-w-4xl mx-auto overflow-hidden md:py-2">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Link
            className={
              "min-w-full relative " + `${image.url && "cursor-pointer"}`
            }
            key={index}
            to={image.url && `/${image.url}`}
          >
            <img
              src={image.image}
              className="w-full object-cover h-60 md:h-96 overflow-hidden lg:rounded-md"
              alt={image.text}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

            <div className="absolute inset-0 flex items-end justify-start m-2">
              <h2 className="text-white text-lg md:text-xl truncate">
                {image.text}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white bg-black bg-opacity-50 rounded-full py-2 px-4"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white bg-black bg-opacity-50 rounded-full py-2 px-4"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;
