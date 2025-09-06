

import '@fortawesome/fontawesome-free/css/all.min.css';
import About from "./components/About"
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import App from "./components/App";
import Navbar from "./Navbar";
import Features from "./components/Features";
import FranchiseProgram from "./components/FranchiseProgram";


export default function RidezzyLanding() {
    
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <App />
      <Features />
      <FranchiseProgram />
      <Footer />
    </div>
  );
}
