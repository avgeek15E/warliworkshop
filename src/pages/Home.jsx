import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Bonuses from "../components/Bonuses";
import Resources from "../components/Resources";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import CourseContent from "../components/CourseContent";
import SectionDivider from "../components/SectionDivider";
import StudentGallery from "../components/StudentGallrey";

function Home() {
  return (
    <div>
      <Hero />

      <SectionDivider />

      <CourseContent />

      <SectionDivider />

      <Bonuses />

      <SectionDivider />

      <Instructor />

      <SectionDivider />

      <StudentGallery />

      <SectionDivider />

      <Pricing />

      <SectionDivider />

      <Footer />
    </div>
  );
}

export default Home;
