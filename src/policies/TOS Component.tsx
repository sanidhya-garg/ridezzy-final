import { useEffect, useState } from "react";

const sections = [
  "Eligibility to Use the Service",
  "Service Overview",
  "Responsibilities of the User",
  "Damage, Theft, and Liabilities",
  "Payments and Refund Policy",
  "Safety and Compliance",
  "Account Suspension or Termination",
  "Limitation of Liability",
  "Changes to the Service or Terms",
  "Governing Law and Jurisdiction",
  "Contact Us",
];

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-600 text-base">
            By using our services, you agree to these Terms of Service. If you do not accept them, do not use our app, website, or vehicles.
          </p>
        </div>

        <Section title="Eligibility to Use the Service">
          <ul className="list-disc ml-6 space-y-2">
            <li>You must be at least 16 years old (for low-speed scooters & with a learner's permit).</li>
            <li>No driving license is required, as Ridezzy provides low-speed electric scooters (below 25 km/h), which are legally allowed without a license.</li>
            <li>You must follow all traffic rules, laws, and local regulations.</li>
            <li>Ridezzy will not be responsible for any fines, penalties, or legal issues caused by you during scooter use.</li>
          </ul>
        </Section>

        <Section title="Service Overview">
          <ul className="list-disc ml-6 space-y-2">
            <li>Ridezzy offers electric scooters on rent across various cities in India.</li>
            <li>Rental durations include daily, weekly, 14-day, and 28-day plans.</li>
            <li>Primary users are delivery partners, but individuals and tourists may also rent.</li>
            <li>All bookings are prepaid and subject to availability.</li>
          </ul>
        </Section>

        <Section title="Responsibilities of the User">
          <ul className="list-disc ml-6 space-y-2">
            <li>Operate the scooter safely and responsibly.</li>
            <li>Follow all applicable traffic rules and local laws.</li>
            <li>Use the scooter only for personal or professional delivery use.</li>
            <li>Do not allow others to ride on your behalf — legal action may be taken if violated.</li>
            <li>Return the scooter on time and in the same condition as provided.</li>
          </ul>
        </Section>

        <Section title="Damage, Theft, and Liabilities">
          <ul className="list-disc ml-6 space-y-2">
            <li>You are responsible for any damage, loss, or theft while the scooter is in your possession.</li>
            <li>Immediately report thefts and file a police report.</li>
            <li>Ridezzy is not liable for fines, legal disputes, or third-party issues during usage.</li>
          </ul>
        </Section>

        <Section title="Payments and Refund Policy">
          <ul className="list-disc ml-6 space-y-2">
            <li>Full payment is required before pickup.</li>
            <li>Payments accepted via UPI, cards, wallets, and net banking.</li>
            <li>No refunds once the ride begins, unless service failure occurs from Ridezzy’s end.</li>
            <li>Late returns will incur additional charges.</li>
          </ul>
        </Section>

        <Section title="Safety and Compliance">
          <ul className="list-disc ml-6 space-y-2">
            <li>Use helmets and adhere to road safety at all times.</li>
            <li>Do not ride in dangerous weather or on restricted terrain.</li>
            <li>You are liable for any harm or violations caused during your ride.</li>
          </ul>
        </Section>

        <Section title="Account Suspension or Termination">
          <ul className="list-disc ml-6 space-y-2">
            <li>Your account may be suspended or terminated if you:</li>
            <li className="ml-4">Cause repeated damage or violations</li>
            <li className="ml-4">Misuse the service or fail to pay dues</li>
            <li className="ml-4">Provide false documents or identification</li>
          </ul>
        </Section>

        <Section title="Limitation of Liability">
          <ul className="list-disc ml-6 space-y-2">
            <li>Ridezzy is not liable for injuries, property damage, or lost belongings.</li>
            <li>We are also not responsible for delays caused by weather, traffic, or other external factors.</li>
          </ul>
        </Section>

        <Section title="Changes to the Service or Terms">
          <ul className="list-disc ml-6 space-y-2">
            <li>Terms, services, and pricing may be updated without prior notice.</li>
            <li>Updates will be published on the website/app.</li>
            <li>Continuing to use the service implies acceptance of new terms.</li>
          </ul>
        </Section>

        <Section title="Governing Law and Jurisdiction">
          <p>These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Delhi, India.</p>
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

export default TermsOfService;
