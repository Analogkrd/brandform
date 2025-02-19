// components/StepLogoPreferences.js
import Image from "next/image";

export default function StepLogoPreferences({
  formData,
  handleChange,
  setFormData,
  nextStep,
  prevStep,
}) {
  const logoStyleOptions = [
    {
      value: "combination",
      label: "Combination mark logos",
      explanation: "Combines text and a symbol into one cohesive mark.",
      img: "/combination.jpg",
    },
    {
      value: "wordmark",
      label: "Wordmark logos",
      explanation: "Uses the company name in a unique typeface.",
      img: "/wordmark.jpg",
    },
    {
      value: "lettermark",
      label: "Lettermark logos",
      explanation: "Focuses on initials or letters to represent the brand.",
      img: "/lettermark.webp",
    },
    {
      value: "monogram",
      label: "Monogram logos",
      explanation: "Interlocks letters to create a compact design.",
      img: "/monogram.webp",
    },
    {
      value: "letterform",
      label: "Letterform logos",
      explanation: "Emphasizes a single letter as the primary design element.",
      img: "/letterform.jpg",
    },
    {
      value: "symbol",
      label: "Symbol or pictorial logos",
      explanation: "Uses an icon or symbol to represent the brand.",
      img: "/symbol.jpg",
    },
    {
      value: "abstract",
      label: "Abstract logos",
      explanation: "Uses abstract shapes to create a unique visual identity.",
      img: "/abstract.webp",
    },
    {
      value: "mascot",
      label: "Mascot logos",
      explanation: "Features a character or mascot representing the brand.",
      img: "/mascot.webp",
    },
    {
      value: "emblem",
      label: "Emblem logos",
      explanation: "Encloses text within a shape or badge.",
      img: "/emblem.webp",
    },
    {
      value: "letters-inside-shape",
      label: "Letters inside shape logos",
      explanation: "Integrates letters inside a defined shape.",
      img: "/lettersinside.webp",
    },
    {
      value: "negative-space",
      label: "Negative space logos",
      explanation: "Uses the background space to reveal a hidden symbol.",
      img: "/negativespace.webp",
    },
    {
      value: "other",
      label: "Other",
      explanation: "Specify if you have another idea in mind.",
      img: "/other.webp",
    },
  ];

  // Custom handler for updating the array of selected logo styles
  const handleLogoStylesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const current = prev.logoStyles || [];
      let newLogoStyles;
      if (checked) {
        newLogoStyles = [...current, value];
      } else {
        newLogoStyles = current.filter((item) => item !== value);
      }
      return { ...prev, logoStyles: newLogoStyles };
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-analogAccent mb-4">
        Logo Preferences
      </h2>
      {/* Logo Ideas */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Do you have any ideas or concepts for your logo?
        </label>
        <textarea
          name="logoIdeas"
          value={formData.logoIdeas}
          onChange={handleChange}
          placeholder="Share sketches, inspirations, or symbols you like."
          rows="3"
          className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
        />
        <p className="text-sm text-gray-500 mt-1">
          Feel free to describe any ideas or inspirations for your logo.
        </p>
      </div>

      {/* Logo Style Options */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Preferred Logo Style(s)
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Select one or more logo styles that appeal to you. Hover for details.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logoStyleOptions.map((option) => {
            const isChecked =
              formData.logoStyles && formData.logoStyles.includes(option.value);
            return (
              <label
                key={option.value}
                className="relative block border rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                {/* Hidden native checkbox */}
                <input
                  type="checkbox"
                  name="logoStyles"
                  value={option.value}
                  checked={isChecked}
                  onChange={handleLogoStylesChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col">
                  <Image
                    src={option.img}
                    alt={option.label}
                            className="w-full h-auto object-cover"
                            width={200}
                            height={100}
                  />
                  <div className="p-2 text-center">
                    <span className="font-semibold block">{option.label}</span>
                    <p className="text-xs text-gray-600">
                      {option.explanation}
                    </p>
                  </div>
                </div>
                {/* Custom overlay checkmark */}
                {isChecked && (
                  <div className="absolute top-2 right-2 bg-analogAccent text-white text-xl font-bold p-1 rounded-full">
                    ✓
                  </div>
                )}
              </label>
            );
          })}
        </div>
        {formData.logoStyles && formData.logoStyles.includes("other") && (
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">
              Please specify your preferred logo style:
            </label>
            <input
              type="text"
              name="logoStylesOther"
              value={formData.logoStylesOther}
              onChange={handleChange}
              placeholder="Describe your custom logo style"
              className="mt-1 w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-analogAccent"
            />
          </div>
        )}
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
          onClick={nextStep}
          className="px-6 py-2 bg-analogAccent text-white rounded hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}
