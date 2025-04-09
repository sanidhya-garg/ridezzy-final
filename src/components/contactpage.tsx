
import Navbar from "../Navbar";
import ContactUs from "./contact";
import Footer from "./Footer";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
  <ContactUs />
</div>
      <Footer />
    </div>
  );
};

export default ContactPage;
