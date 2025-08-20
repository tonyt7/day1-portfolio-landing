import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SkillCarousel from "./components/SkillCarousel";
import AboutMe from "./components/AboutMe";
import JourneyTimeline from "./components/JourneyTimeline";
import ProjectGallery from "./components/ProjectGallery";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { sampleProjects } from "./data/sampleProjects";
function App() {
  return (
    <>
      <Navbar/>
      <Hero />
      <SkillCarousel/>
      <AboutMe/>
      <JourneyTimeline/>
      <ProjectGallery heading="Project Showcase" projects={sampleProjects} />
      <ContactForm/>
      <Footer/>
    </>
  );
}


export default App;
