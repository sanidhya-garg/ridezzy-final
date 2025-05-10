import { useEffect, useState } from "react";

const sections = [
  "No Returns",
  "Refunds After Rental Period Starts",
  "Booking Cancellations (Before Rental Start Date)",
  "How to Request a Cancellation",
  "Exceptions",
  "Contact for Support",
];

const RefundPolicy = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY + 220 >= el.offsetTop) {
          setActive(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section id={title} className="scroll-mt-28 mb-12 border-b pb-8">
      <h2 className="text-2xl font-semibold text-yellow-600 mb-4">{title}</h2>
      <div className="text-gray-800 text-base leading-relaxed space-y-3">{children}</div>
    </section>
  );

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-16 font-sans">
      {/* Sidebar */}
      <aside className="hidden lg:block w-full lg:w-1/4 mb-10 lg:mb-0 lg:pr-6 sticky top-28 h-max">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Jump to section</h3>
          <ul className="space-y-3 text-sm">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`block px-2 py-1 rounded-md transition-all ${
                    active === section
                      ? "bg-yellow-100 text-yellow-700 font-medium"
                      : "text-gray-700 hover:text-yellow-700 hover:bg-yellow-50"
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Refund Policy</h1>
          <p className="text-gray-600 text-base">
            This Refund Policy outlines the terms and conditions for refunds and cancellations for services offered by Ridezzy Logistics Private Limited. Please read it carefully before booking a rental.
          </p>
        </div>

        <Section title="No Returns">
          <ul className="list-disc ml-6 space-y-2">
            <li>Our service is strictly rental-based.</li>
            <li>Once a scooter is rented and handed over to the customer, returns are not accepted.</li>
            <li>There is no return option for partial usage or change of mind.</li>
          </ul>
        </Section>

        <Section title="Refunds After Rental Period Starts">
          <ul className="list-disc ml-6 space-y-2">
            <li>No refund will be provided if the scooter is returned before the rental period ends.</li>
            <li>Ridezzy does not offer partial refunds once the rental period has started, regardless of usage.</li>
          </ul>
        </Section>

        <Section title="Booking Cancellations (Before Rental Start Date)">
          <ul className="list-disc ml-6 space-y-2">
            <li>Partial refunds are available if the booking is canceled before the rental start date.</li>
            <li>A cancellation fee will be deducted from the total amount paid.</li>
            <li>The fee depends on the rental duration and type and will be disclosed during cancellation.</li>
          </ul>
        </Section>

        <Section title="How to Request a Cancellation">
          <ul className="list-disc ml-6 space-y-2">
            <li>Contact our support team via email or the app at least 12 hours before the rental begins.</li>
            <li>Provide your booking ID and registered contact details for verification.</li>
            <li>Refunds (after deduction) will be processed to the original payment method within 5–7 business days.</li>
          </ul>
        </Section>

        <Section title="Exceptions">
          <ul className="list-disc ml-6 space-y-2">
            <li>Ridezzy may cancel a booking due to unavailability, technical issues, or other unforeseen situations.</li>
            <li>In such cases, a full refund will be issued without any deductions.</li>
          </ul>
        </Section>

        <Section title="Contact for Support">
          <ul className="space-y-1">
            <li><strong>Company:</strong> Ridezzy Logistics Private Limited</li>
            <li><strong>Email:</strong> support@ridezzy.com</li>
            <li><strong>Phone:</strong> +91 9220424574</li>
            <li><strong>Address:</strong> Plot No-7, Third Floor, Uttam Nagar, New Delhi, West Delhi- 110059</li>
          </ul>
        </Section>
      </main>
    </div>
  );
};

export default RefundPolicy;
