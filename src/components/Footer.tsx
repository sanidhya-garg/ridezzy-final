export default function Footer() {
  return (
    <footer className="bg-[#060E26] text-white px-6 md:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + Description */}
        <div className="col-span-1">
         <p>Ridezzy</p>
          <p className="text-sm text-gray-400 mt-2">
            Driving the future of urban mobility.
          </p>
          
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-yellow-400 text-sm mb-4 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-yellow-300 transition">Dost</li>
            <li className="hover:text-yellow-300 transition">Partner</li>
            <li className="hover:text-yellow-300 transition">Careers</li>
            <li className="hover:text-yellow-300 transition">Blogs</li>
            <li className="hover:text-yellow-300 transition">Newsroom</li>
            <li className="hover:text-yellow-300 transition">FAQs</li>
            <li className="hover:text-yellow-300 transition">About</li>
            <li className="hover:text-yellow-300 transition">Contact Us</li>
          </ul>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-semibold text-yellow-400 text-sm mb-4 uppercase tracking-wider">
            Products
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-yellow-300 transition">Wynn XP</li>
            <li className="hover:text-yellow-300 transition">Miracle NV</li>
            <li className="hover:text-yellow-300 transition">DeX NV</li>
            <li className="hover:text-yellow-300 transition">Miracle GR</li>
            <li className="hover:text-yellow-300 transition">DeX GR</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-semibold text-yellow-400 text-sm mb-4 uppercase tracking-wider">
            Address
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Ridezzy, 2nd Floor, Etamin Block (Wing A),<br />
            Prestige Tech Park, Kadubeesanahalli,<br />
            Bengaluru, Karnataka 560103, India
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold text-yellow-400 text-sm mb-4 uppercase tracking-wider">
            Follow Us
          </h4>
          <div className="flex gap-4 text-gray-400 text-xl">
            <i className="fab fa-facebook-f hover:text-yellow-300 transition"></i>
            <i className="fab fa-instagram hover:text-yellow-300 transition"></i>
            <i className="fab fa-linkedin-in hover:text-yellow-300 transition"></i>
            <i className="fab fa-twitter hover:text-yellow-300 transition"></i>
            <i className="fab fa-youtube hover:text-yellow-300 transition"></i>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-700 my-10" />

      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ridezzy Pvt Ltd. All rights reserved.
      </p>
    </footer>
  );
}
