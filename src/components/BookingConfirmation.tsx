import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';

interface BookingData {
  selectedColor: string;
  selectedVariant: string;
  bookingAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking data from navigation state
  const bookingData = location.state as BookingData;

  const handleGoBack = () => {
    navigate('/buy-pulse');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Scooter Details
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmation
            </h1>
            <p className="text-gray-600">
              Complete your booking to secure your Ridezzy Premium Scooter
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Booking Summary
              </h2>
              
              {bookingData ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Scooter Model</span>
                    <span className="font-medium">Ridezzy Premium</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Variant</span>
                    <span className="font-medium">{bookingData.selectedVariant}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{bookingData.selectedColor}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Customer Name</span>
                    <span className="font-medium">{bookingData.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{bookingData.customerEmail}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium">{bookingData.customerPhone}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 pt-6">
                    <span className="text-lg font-semibold text-gray-900">Booking Amount</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      ₹{bookingData.bookingAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto mb-4 text-yellow-500" size={48} />
                  <p className="text-gray-600">No booking data found. Please start your booking from the scooter page.</p>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Gateway
              </h2>
              
              {/* 404 Message */}
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="text-red-600" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  404 - Payment Gateway Not Found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  The payment gateway is currently under development. 
                  Our secure payment system will be available here soon.
                </p>
                
                {/* Coming Soon Features */}
                <div className="bg-gray-50 rounded-xl p-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} />
                    Coming Soon
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <CreditCard size={16} className="text-yellow-500" />
                      Multiple payment options (UPI, Cards, Net Banking)
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield size={16} className="text-yellow-500" />
                      256-bit SSL encryption for secure transactions
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-yellow-500" />
                      Instant booking confirmation
                    </li>
                    <li className="flex items-center gap-3">
                      <AlertCircle size={16} className="text-yellow-500" />
                      EMI options available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Modify Booking
            </button>
            <button
              className="px-8 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-medium cursor-not-allowed opacity-50"
              disabled
            >
              Proceed to Payment (Coming Soon)
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need Help with Your Booking?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to assist you with any questions about your booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+91 9289597226"
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-medium"
              >
                Call Support
              </a>
              <a
                href="mailto:support@ridezzy.com"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
