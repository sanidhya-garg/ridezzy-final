import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RidezzyLanding from "./RidezzyLanding";
import AboutUs from "./components/AboutUs";  // No need for .tsx extension
import ContactPage from "./components/contactpage";
import BlogPage from "./components/Blog";
import BlogDetail from "./BlogDetail";
import BanaPage from "./components/BanaPage";
import TOS from "./policies/Termsofservice";
import AdvertisementPage from "./advertisingpage";
import PrivacyPolicy from "./policies/Privacypolicy";
import RefundPolicy from "./policies/Refundpolicy";
import CheckoutPage from "./components/BuyPulse";
import BookingConfirmation from "./components/BookingConfirmation";
import EnvironmentPage from "./environment1";
import NotFound from "./components/NotFound";
import CareersPage from "./components/CareersPage";
import AdminDashboard from "./components/AdminDashboard";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RidezzyLanding />} />
        <Route path="/about" element={<AboutUs />} />  {/* Corrected this line */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/pulse" element={<BanaPage />} /> {/* Placeholder for Bana page */}
        <Route path="/advertising" element={<AdvertisementPage />} />
        <Route path="/buy-pulse" element={<CheckoutPage />} /> {/* Placeholder for Advertisement page */}
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/terms-of-service" element={<TOS />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Placeholder for Privacy Policy */}
        <Route path="/refund-policy" element={<RefundPolicy />} /> {/* Placeholder for Advertisement page */}
        <Route path="/environment" element={<EnvironmentPage />} /> {/* Placeholder for Environment page */}
        <Route path="/careers" element={<CareersPage />} /> {/* Careers page */}
        <Route path="/careers/:jobId" element={<CareersPage />} /> {/* Individual job page */}
        <Route path="/admin" element={<AdminDashboard />} /> {/* Placeholder for Checkout page */}
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
