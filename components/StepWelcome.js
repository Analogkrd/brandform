// components/StepWelcome.js
export default function StepWelcome({ formData, setFormData, nextStep }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Update serviceOption and set the boolean flags accordingly
    setFormData((prev) => ({
      ...prev,
      serviceOption: value,
      wantsBranding: value === "branding" || value === "both",
      wantsWebsite: value === "website" || value === "both",
    }));
  };

  const proceed = () => {
    if (!formData.serviceOption) {
      alert("Please select one option.");
      return;
    }
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Welcome to Analog Brand Form
      </h2>
      <p className="mb-4 text-gray-700">
        What do you want to create? Select one option below:
      </p>
      <div className="space-y-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="serviceOption"
            value="branding"
            checked={formData.serviceOption === "branding"}
            onChange={handleChange}
          />
          <span>Branding</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="serviceOption"
            value="website"
            checked={formData.serviceOption === "website"}
            onChange={handleChange}
          />
          <span>Website</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="serviceOption"
            value="both"
            checked={formData.serviceOption === "both"}
            onChange={handleChange}
          />
          <span>Branding &amp; Website</span>
        </label>
      </div>

      <div className="text-right mt-6">
        <button
          type="button"
          onClick={proceed}
          className="px-6 py-2 bg-analogAccent text-white rounded hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
