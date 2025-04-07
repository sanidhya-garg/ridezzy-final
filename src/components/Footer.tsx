export default function Footer() {
  return (
    <footer className="bg-[#060E26] text-white py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-5 gap-10">
        {/* Logo */}
        <div className="col-span-1">
          <img src="/images/ridezzy-logo.png" alt="Ridezzy" className="h-10 mb-6" />
        </div>

        {/* Links: Column 1 */}
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Dost</li>
            <li>Partner</li>
            <li>Careers</li>
            <li>Blogs</li>
            <li>Newsroom</li>
            <li>FAQs</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Links: Column 2 */}
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-white mb-2">Products</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Wynn XP</li>
            <li>Miracle NV</li>
            <li>DeX NV</li>
            <li>Miracle GR</li>
            <li>DeX GR</li>
          </ul>
        </div>

        {/* Address */}
        <div className="text-sm text-gray-400">
          <h4 className="font-semibold text-white mb-2">Address</h4>
          <p>
            Ridezzy, 2nd Floor, Etamin Block (Wing A), Prestige Tech Park,
            Kadubeesanahalli, Bengaluru, Karnataka 560103 India
          </p>
        </div>

        {/* App & Social */}
        <div className="space-y-4 text-sm">
          

          <div>
            <h4 className="font-semibold text-white mt-4 mb-2">Follow Us on</h4>
            <div className="flex gap-4 text-gray-400 text-xl">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-700 my-8" />

      <p className="text-center text-sm text-gray-500">
        Copyright © {new Date().getFullYear()} Ridezzy Pvt Ltd
      </p>
    </footer>
  );
}
