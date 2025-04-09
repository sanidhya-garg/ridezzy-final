import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_9b0x0y4';
const USER_TEMPLATE_ID = 'template_3zpoj09';
const USER_ID = '4SUovqTv3wgh5zyq4';

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  location: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    email: '',
    location: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const templateParams = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      location: formData.location,
      subject: formData.subject,
      message: formData.message
    };

    try {
      await emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, USER_ID);

      alert("Thank you for reaching out! A confirmation email has been sent to your inbox.");

      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        location: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white text-black">
      {/* Left Section - Form */}
      <div className="md:w-1/2 py-6 px-10 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="mb-8 text-gray-700">
          At Ridezzy, we believe in the power of collaboration to bring about big changes. Join us in building sustainable and efficient urban mobility.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name*"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number*"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border md:col-span-2 p-3 rounded-md"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="border md:col-span-2 p-3 rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-500 transition md:col-span-2"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Section - Google Map */}
      <div className="md:w-1/2 h-auto">
        <iframe
          title="Ridezzy Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609930698!2d72.74109902663262!3d19.082197839528998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63ab1b4c3b9%3A0x7b82a91bfcf675de!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
          className="w-full h-full min-h-[300px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
