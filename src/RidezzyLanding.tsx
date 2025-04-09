
import { Link } from "react-router-dom";

import Testimonial from "./components/Testimonial";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './assets/logo.jpeg';
import Product from "./components/Product"
import Career from "./components/Career"
import  About from "./components/About"
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import App from "./components/App";
import Navbar from "./Navbar";

export default function RidezzyLanding() {
    
  return (
    <div>
    <Navbar />
     <Hero />
      <About />
      <App />
      <Product />
<Career />
<Testimonial/>
<Footer />
      {/* Google Map Section */}
     
      {/* Professional Footer */}

    </div>
  );
}
