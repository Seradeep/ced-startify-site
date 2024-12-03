export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-6 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Refund Policy</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Eligibility for Refunds
          </h2>
          <ul className="list-disc pl-6">
            <li>Payment errors (e.g., duplicate payments).</li>
            <li>Event cancellation by the organizer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Refund Process
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Users must submit a refund request via email to{" "}
              <a
                href="mailto:refunds@austartify.com"
                className="text-purple-600 hover:underline"
              >
                refunds@austartify.com
              </a>{" "}
              within 7 days of payment.
            </li>
            <li>
              Refunds will be processed within 7–14 business days upon
              verification.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Non-Refundable Scenarios
          </h2>
          <ul className="list-disc pl-6">
            <li>User cancellation after successful registration.</li>
            <li>Failure to attend the event.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Payment Gateway Charges
          </h2>
          <p>
            Refunds will exclude the Razorpay transaction fee and any applicable
            taxes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Contact Us
          </h2>
          <p>
            For refund-related queries, contact us at{" "}
            <a
              href="mailto:cedau.outreach@gmail.com"
              className="text-purple-600 hover:underline"
            >
              cedau.outreach@gmail.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+914422359289"
              className="text-purple-600 hover:underline"
            >
              +91-44-22359289
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
