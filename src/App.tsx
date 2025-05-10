import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RidezzyLanding from "./RidezzyLanding";
import AboutUs from "./components/AboutUs";  // No need for .tsx extension
import ContactPage from "./components/contactpage";
import BlogPage from "./components/Blog";
import BanaPage from "./components/BanaPage";
import TOS from "./policies/Termsofservice";
import AdvertisementPage from "./advertisingpage";
import PrivacyPolicy from "./policies/Privacypolicy";
import RefundPolicy from "./policies/Refundpolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RidezzyLanding />} />
        <Route path="/about" element={<AboutUs />} />  {/* Corrected this line */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} /> {/* Placeholder for Bana page */}
        <Route path="/bana" element={<BanaPage />} /> {/* Placeholder for Bana page */}
        <Route path="/advertising" element={<AdvertisementPage />} />
        <Route path="/terms-of-service" element={<TOS />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Placeholder for Privacy Policy */}
        <Route path="/refund-policy" element={<RefundPolicy />} /> {/* Placeholder for Advertisement page */}

      </Routes>
    </Router>
  );
}

export default App;
