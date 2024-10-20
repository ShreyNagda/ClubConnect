import banner from "../assets/apsit_thane_cover.jpeg";
function AboutSection() {
  return (
    <section className="w-full flex justify-center my-3">
      <div className="w-clamp m-2 shadow-lg rounded-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">About APSIT</h2>
        <div className="p-2">
          A. P. Shah Institute of Technology (APSIT) is an engineering college
          located in Thane, Maharashtra, India, established in 2014. The
          institute is affiliated with the University of Mumbai, approved by the
          All India Council for Technical Education (AICTE), and has received
          NBA accreditation with an A+ grade, reflecting its commitment to high
          academic standards and quality education.
          <img
            src={banner}
            alt=""
            className=" w-full object-cover object-center h-64 md:h-96"
          />
          <div className="p-2">
            APSIT's NBA accreditation and A+ grade highlight its strong academic
            programs and industry-aligned education, making it a leading choice
            for aspiring engineers.
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
