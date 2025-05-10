import { useEffect, useState } from "react";

const sections = [
  "Information We Collect",
  "How We Use Your Information",
  "Data Sharing and Disclosure",
  "Damage or Theft Liability",
  "Data Security",
  "Your Rights",
  "Updates to the Privacy Policy",
  "Contact Us",
];

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-600 text-base">
            This Privacy Policy explains how Ridezzy Logistics Private Limited collects, uses, shares,
            and protects your personal information when you use our website, mobile application,
            or services.
          </p>
        </div>

        <Section title="Information We Collect">
          <ul className="list-disc ml-6 space-y-2">
            <li>Personal Information: Full name, email ID, mobile number, address, age, and valid government-issued ID.</li>
            <li>Rental & Service Information: Duration, scooter ID, usage details, and rental plan.</li>
            <li>Payment Information: Billing data, payment method, and transaction ID (via secure gateways).</li>
            <li>Location & Usage Data: GPS location during active rentals, ride history, usage analytics.</li>
            <li>Device & Technical Data: IP, device type, OS, browser, and crash logs.</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <ul className="list-disc ml-6 space-y-2">
            <li>Register accounts and verify identity.</li>
            <li>Process bookings, payments, and ride history.</li>
            <li>Ensure scooter safety during rentals.</li>
            <li>Customer support and app improvements.</li>
            <li>Send promotions/updates (only with opt-in).</li>
          </ul>
        </Section>

        <Section title="Data Sharing and Disclosure">
          <ul className="list-disc ml-6 space-y-2">
            <li>No sale of personal data.</li>
            <li>Shared with trusted partners (support, analytics, etc.).</li>
            <li>Shared with authorities if legally required.</li>
            <li>Used to file police reports or insurance claims in case of theft/damage.</li>
          </ul>
        </Section>

        <Section title="Damage or Theft Liability">
          <ul className="list-disc ml-6 space-y-2">
            <li>Users are fully responsible for scooter damage, loss, or theft.</li>
            <li>We may use your data to contact or recover costs.</li>
          </ul>
        </Section>

        <Section title="Data Security">
          <ul className="list-disc ml-6 space-y-2">
            <li>Data stored securely with encryption and access control.</li>
            <li>Access only to authorized staff/partners.</li>
            <li>Systems regularly updated to prevent breaches.</li>
          </ul>
        </Section>

        <Section title="Your Rights">
          <ul className="list-disc ml-6 space-y-2">
            <li>Access and update your data.</li>
            <li>Request data deletion (unless legally retained).</li>
            <li>Opt out of promotions any time.</li>
          </ul>
        </Section>

        <Section title="Updates to the Privacy Policy">
          <ul className="list-disc ml-6 space-y-2">
            <li>We may update the policy from time to time.</li>
            <li>Major updates will be notified via app/website/email.</li>
            <li>Continued use means you accept the updates.</li>
          </ul>
        </Section>

        <Section title="Contact Us">
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

export default PrivacyPolicy;