export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Privacy Policy
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Introduction
          </h2>
          <p>
            IyyanSoft Technologies respects your privacy and is committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, and share your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Personal details such as name, email, phone number, and payment
              information.
            </li>
            <li>Event-related data provided during registration.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. How We Use Your Data
          </h2>
          <ul className="list-disc pl-6">
            <li>To process registrations and payments.</li>
            <li>To communicate updates related to events or services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Data Security
          </h2>
          <p>
            We implement strict security measures to protect your data during
            online transactions. Payments are processed securely through
            Razorpay.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Third-Party Sharing
          </h2>
          <p>
            Your data will not be shared with unauthorized third parties. Data
            shared with Razorpay is subject to their Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, modify, or delete your data upon
            request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Us
          </h2>
          <p>
            For concerns about your data, email us at{" "}
            <a
              href="mailto:iyyansoft@gmail.com"
              className="text-purple-600 hover:underline"
            >
              iyyansoft@gmail.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919944085762"
              className="text-purple-600 hover:underline"
            >
              +91-9944085762
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
