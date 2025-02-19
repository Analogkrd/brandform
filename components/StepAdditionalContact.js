// components/StepAdditionalContact.js
export default function StepAdditionalContact({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
  submitting,
  success,
}) {
  // Local submit handler that checks required contact fields.
  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.contactName.trim() ||
      !formData.contactEmail.trim() ||
      !formData.contactPhone.trim()
    ) {
      alert("Please fill in all contact details (Name, Email, and Phone).");
      return;
    }
    // All required contact fields are filled, call parent's handleSubmit.
    handleSubmit(e);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Additional Information
      </h2>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Any additional details or special requests?
        </label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Feel free to share any extra information"
          rows="3"
          className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Provide any further details that can help us understand your vision.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">Provide your full name.</p>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Your Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll use this email to contact you regarding your inquiry.
          </p>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Provide your phone number.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handleLocalSubmit}
          disabled={submitting}
          className="px-6 py-2 bg-analogAccent text-white rounded hover:bg-orange-600 transition-colors"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {success === true && (
        <p className="text-green-600 text-center mt-4">
          Thank you! Your inquiry has been submitted.
        </p>
      )}
      {success === false && (
        <p className="text-red-600 text-center mt-4">
          There was an error submitting the form. Please try again.
        </p>
      )}
    </section>
  );
}
