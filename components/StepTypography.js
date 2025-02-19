// components/StepTypography.js

const typographyOptions = [
  {
    value: "geometric",
    label: "Geometric (Montserrat)",
    style: { fontFamily: "'Montserrat', sans-serif" },
  },
  {
    value: "rounded",
    label: "Rounded (Nunito)",
    style: { fontFamily: "'Nunito', sans-serif" },
  },
  {
    value: "playful",
    label: "Playful (Pacifico)",
    style: { fontFamily: "'Pacifico', cursive" },
  },
  {
    value: "serious",
    label: "Serious (Roboto)",
    style: { fontFamily: "'Roboto', sans-serif" },
  },
  {
    value: "serif",
    label: "Serif (Merriweather)",
    style: { fontFamily: "'Merriweather', serif" },
  },
  {
    value: "sans-serif",
    label: "Sans-serif (Open Sans)",
    style: { fontFamily: "'Open Sans', sans-serif" },
  },
  {
    value: "handwritten",
    label: "Handwritten (Patrick Hand)",
    style: { fontFamily: "'Patrick Hand', cursive" },
  },
  { value: "other", label: "Other", style: {} },
];

export default function StepTypography({
  formData,
  handleChange,
  nextStep,
  prevStep,
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Preferred Typography
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Which font style resonates with your brand? (For overall
        design/website.)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {typographyOptions.map((option) => (
          <label
            key={option.value}
            className={`border rounded p-3 flex flex-col items-center cursor-pointer ${
              formData.preferredTypography === option.value
                ? "border-analogAccent"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="preferredTypography"
              value={option.value}
              checked={formData.preferredTypography === option.value}
              onChange={handleChange}
              className="mb-2"
            />
            <span style={option.style} className="text-lg text-center">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {formData.preferredTypography === "other" && (
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Please specify your preferred font style:
          </label>
          <input
            type="text"
            name="preferredTypographyOther"
            value={formData.preferredTypographyOther}
            onChange={handleChange}
            placeholder="Enter custom font style"
            className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
          />
        </div>
      )}

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
