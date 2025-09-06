import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, Phone, Mail, Building, Users } from "lucide-react";

interface FleetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FleetQuoteModal({ isOpen, onClose }: FleetQuoteModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    fleetSize: "",
    businessType: "",
    currentVehicles: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Fleet Quote Request:", formData);
    // You can add API call here
    alert("Thank you! We'll contact you within 24 hours with a customized fleet quote.");
    onClose();
    // Reset form
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      fleetSize: "",
      businessType: "",
      currentVehicles: "",
      message: ""
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FFD400] to-[#FFA500] p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-3">
                  <Truck className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-black">Get Fleet Quote</h2>
                    <p className="text-white/90">Tell us about your delivery needs</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-[#FFD400]" />
                        Company Information
                      </h3>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                          placeholder="your@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Fleet Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-[#FFD400]" />
                        Fleet Requirements
                      </h3>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fleet Size Required *
                        </label>
                        <select
                          name="fleetSize"
                          value={formData.fleetSize}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                        >
                          <option value="">Select fleet size</option>
                          <option value="1-5">1-5 scooters</option>
                          <option value="6-10">6-10 scooters</option>
                          <option value="11-25">11-25 scooters</option>
                          <option value="26-50">26-50 scooters</option>
                          <option value="51-100">51-100 scooters</option>
                          <option value="100+">100+ scooters</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Business Type *
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                        >
                          <option value="">Select business type</option>
                          <option value="food-delivery">Food Delivery</option>
                          <option value="e-commerce">E-commerce Delivery</option>
                          <option value="grocery">Grocery Delivery</option>
                          <option value="courier">Courier Services</option>
                          <option value="logistics">Logistics Company</option>
                          <option value="pharmacy">Pharmacy Delivery</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Vehicle Fleet
                        </label>
                        <input
                          type="text"
                          name="currentVehicles"
                          value={formData.currentVehicles}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                          placeholder="e.g., 10 bikes, 5 cars"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition-all"
                      placeholder="Tell us about any specific requirements, timeline, or questions you have..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FFD400] to-[#FFA500] text-white rounded-lg font-bold hover:from-[#FFC400] hover:to-[#FF9500] transition-all transform hover:scale-105 shadow-lg"
                    >
                      Get My Fleet Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
