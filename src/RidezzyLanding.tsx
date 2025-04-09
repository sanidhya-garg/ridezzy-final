

import Testimonial from "./components/Testimonial";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product from "./components/Product"
import Career from "./components/Career"
import  About from "./components/About"
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import App from "./components/App";
import Navbar from "./Navbar";
import Contact from "./components/contact";

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
<Contact />
<Footer />
      {/* Google Map Section */}
     
      {/* Professional Footer */}

    </div>
  );
}
