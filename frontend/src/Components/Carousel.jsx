import { useQuery } from "react-query";
import axios from "axios";
import banner from "../assets/banner.jpg";
import { useState } from "react";

function Carousel() {
  const fetchData = async () => {
    return axios.get("/api/carousel/").then((res) => res.data);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: images, error, isLoading } = useQuery("imagesData", fetchData);

  if (isLoading) return <div className=""> Loading</div>;
  if (error) return <div className="">Error</div>;
  // if (images.length <= 0)
  //   return <img src={banner} alt="Banner Image" className="object-fill" />;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative top-[0px] w-full max-w-4xl mx-auto overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="min-w-full" key={index}>
            <img
              src={image.image}
              className="w-full object-cover h-64 md:h-96 overflow-hidden"
              alt={image.text}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white bg-black bg-opacity-50 rounded-full p-2"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;
