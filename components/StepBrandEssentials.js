// components/StepBrandEssentials.js
export default function StepBrandEssentials({
  formData,
  handleChange,
  nextStep,
  prevStep,
}) {
  // Validate that the business name is not empty before proceeding
  const handleNext = () => {
    if (!formData.businessName || formData.businessName.trim() === "") {
      alert("Please enter your business name.");
      return;
    }
    nextStep();
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Brand Essentials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="Enter your business name"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter the official name of your business or organization.
          </p>
        </div>

        {/* Business Description */}
        <div>
          <label className="block text-gray-700 font-medium">
            What does your business do?
          </label>
          <textarea
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Describe your products, services, or mission."
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Briefly describe what your business offers or stands for.
          </p>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-gray-700 font-medium">
            Who is your target audience?
          </label>
          <textarea
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            required
            rows="2"
            placeholder="E.g., age group, industry, interests"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Describe your typical or ideal customers.
          </p>
        </div>

        {/* Brand Personality */}
        <div>
          <label className="block text-gray-700 font-medium">
            Describe your brand personality
          </label>
          <input
            type="text"
            name="brandPersonality"
            value={formData.brandPersonality}
            onChange={handleChange}
            placeholder="E.g., modern, friendly, sophisticated"
            required
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Choose adjectives that reflect the vibe of your brand.
          </p>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-gray-700 font-medium">
            Do you have a tagline or slogan?
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Optional tagline"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            A short, memorable phrase (optional).
          </p>
        </div>

        {/* Business Values */}
        <div>
          <label className="block text-gray-700 font-medium">
            What are your business values? (Optional)
          </label>
          <textarea
            name="businessValues"
            value={formData.businessValues}
            onChange={handleChange}
            placeholder="E.g., integrity, innovation"
            rows="2"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            List core values that define your business.
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
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-analogAccent text-white rounded hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}
