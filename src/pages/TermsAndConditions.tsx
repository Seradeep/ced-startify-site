export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-6 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Terms and Conditions
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>austartify.com</strong>, a service provided by
            IyyanSoft Technologies. By accessing or using our website, you agree
            to comply with the following terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Services Provided
          </h2>
          <p>
            <strong>austartify.com</strong> facilitates event registration,
            payment processing, and related services. These services are offered
            in association with the Centre for Entrepreneurship Development
            (CED), Anna University, Chennai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. User Obligations
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Users must provide accurate information during registration and
              payment.
            </li>
            <li>Unauthorized use of the platform is strictly prohibited.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Payments
          </h2>
          <p>
            All payments are securely processed via Razorpay. Users must adhere
            to Razorpay’s terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Data Usage
          </h2>
          <p>
            The data provided by users will be managed according to our Privacy
            Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these Terms and Conditions at any
            time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Us
          </h2>
          <p>
            For any queries, contact us at{" "}
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
