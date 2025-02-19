// components/StepWebsiteQuestions.js

const pageOptions = [
  { value: "single", label: "Single Page (basic info & social links)" },
  {
    value: "standard",
    label: "Standard 4 Pages (Home, Services, About, Contact)",
  },
  { value: "custom", label: "Custom Number of Pages" },
];

const styleOptions = [
  { value: "clean", label: "Clean" },
  { value: "minimalist", label: "Minimalist" },
  { value: "bold", label: "Bold" },
  { value: "elegant", label: "Elegant" },
  { value: "other", label: "Other" },
];

const languageOptions = ["English", "Kurdish", "Arabic", "Turkish", "Other"];

export default function StepWebsiteQuestions({
  formData,
  handleChange,
  nextStep,
  prevStep,
}) {
  const { websitePages, customPages, websiteLanguages, websiteLanguagesOther } =
    formData;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Website Details
      </h2>
      <div className="space-y-6">
        {/* Pages */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            How many pages do you want?
          </label>
          <div className="flex flex-col space-y-2">
            {pageOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="websitePages"
                  value={opt.value}
                  checked={websitePages === opt.value}
                  onChange={handleChange}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          {websitePages === "custom" && (
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">
                Please specify the custom number of pages:
              </label>
              <input
                type="text"
                name="customPages"
                value={customPages}
                onChange={handleChange}
                placeholder="e.g., 6 pages, 10 pages, etc."
                className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
              />
            </div>
          )}
        </div>

        {/* Languages */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Which languages should the website support?
          </label>
          <p className="text-sm text-gray-500 mb-2">Select all that apply.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {languageOptions.map((lang) => (
              <label
                key={lang}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="websiteLanguages"
                  value={lang}
                  checked={websiteLanguages.includes(lang)}
                  onChange={handleChange}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
          {/* If "Other" is checked, show a text input */}
          {websiteLanguages.includes("Other") && (
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">
                Please specify other language(s):
              </label>
              <input
                type="text"
                name="websiteLanguagesOther"
                value={websiteLanguagesOther}
                onChange={handleChange}
                placeholder="e.g., French, Spanish, etc."
                className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
              />
            </div>
          )}
        </div>

        {/* Style Preference */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Website Style Preference
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Choose one. If "Other," please specify.
          </p>
          <div className="flex flex-wrap gap-4">
            {styleOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center space-x-2 cursor-pointer border rounded p-2 ${
                  formData.websiteStylePreference === opt.value
                    ? "border-analogAccent"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="websiteStylePreference"
                  value={opt.value}
                  checked={formData.websiteStylePreference === opt.value}
                  onChange={handleChange}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          {formData.websiteStylePreference === "other" && (
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">
                Please describe your desired website style:
              </label>
              <input
                type="text"
                name="websiteStyleOther"
                value={formData.websiteStyleOther}
                onChange={handleChange}
                placeholder="Describe the style"
                className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
              />
            </div>
          )}
        </div>

        {/* Admired Websites */}
        <div>
          <label className="block text-gray-700 font-medium">
            Are there any websites you admire? (Please list URLs)
          </label>
          <textarea
            name="admiredWebsites"
            value={formData.admiredWebsites}
            onChange={handleChange}
            placeholder="E.g., https://example.com, https://anotherexample.com"
            rows="2"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Provide links to websites whose design you like, separated by
            commas.
          </p>
        </div>

        {/* Website Colors */}
        <div>
          <label className="block text-gray-700 font-medium">
            Preferred Website Colors
          </label>
          <input
            type="text"
            name="websiteColors"
            value={formData.websiteColors}
            onChange={handleChange}
            placeholder="E.g., blue, white"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            List any colors you'd like to see on your website (optional).
          </p>
        </div>

        {/* Website Functionalities */}
        <div>
          <label className="block text-gray-700 font-medium">
            Any specific functionalities you need on your website?
          </label>
          <textarea
            name="websiteFunctionalities"
            value={formData.websiteFunctionalities}
            onChange={handleChange}
            placeholder="E.g., e-commerce, blog, contact form"
            rows="2"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Describe any additional features or functionalities you require.
          </p>
        </div>
      </div>

      {/* Nav Buttons */}
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
          onClick={nextStep}
          className="px-6 py-2 bg-analogAccent text-white rounded hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}
