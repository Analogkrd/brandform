// pages/index.js
import Head from "next/head";
import { useState } from "react";
import StepWelcome from "../components/StepWelcome";
import StepBrandEssentials from "../components/StepBrandEssentials";
import StepLogoPreferences from "../components/StepLogoPreferences";
import StepWebsiteQuestions from "../components/StepWebsiteQuestions";
import StepTypography from "../components/StepTypography";
import StepAdditionalContact from "../components/StepAdditionalContact";
import Image from "next/image";

/* --- All Steps (some will be skipped depending on user selection) --- */
const steps = [
  "Welcome",
  "Brand Essentials",
  "Logo Preferences",
  "Website Details",
  "Typography",
  "Additional Info & Contact",
];

export default function Home() {
  // Our form data includes user’s choices about Branding / Website
  const [formData, setFormData] = useState({
    serviceOption: "", // New field for service selection
    wantsBranding: false,
    wantsWebsite: false,
    // Branding fields
    businessName: "",
    businessDescription: "",
    targetAudience: "",
    brandPersonality: "",
    tagline: "",
    businessValues: "",
    logoIdeas: "",
    logoStyles: [],
    logoStylesOther: "",
    logoColors: "",
    // Website fields
    websitePages: "",
    customPages: "",
    websiteLanguages: [],
    websiteLanguagesOther: "",
    websiteStylePreference: "",
    websiteStyleOther: "",
    admiredWebsites: "",
    websiteColors: "",
    websiteFunctionalities: "",
    // Typography
    preferredTypography: "",
    preferredTypographyOther: "",
    // Additional and Contact
    additionalInfo: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [currentStep, setCurrentStep] = useState(0); // 0-based index
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If we're dealing with a multi-select (languages) checkboxes:
    if (name === "websiteLanguages" && type === "checkbox") {
      const { checked } = e.target;
      setFormData((prev) => {
        const newLangs = new Set(prev.websiteLanguages);
        if (checked) {
          newLangs.add(value);
        } else {
          newLangs.delete(value);
        }
        return { ...prev, websiteLanguages: Array.from(newLangs) };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Navigation
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Build an array of steps we actually want to show based on user’s choices
  const getVisibleSteps = () => {
    const visibleSteps = [];
    // Step 0: always show (Welcome)
    visibleSteps.push("welcome");
    // Step 1: Branding
    if (formData.wantsBranding) {
      visibleSteps.push("brandEssentials");
      visibleSteps.push("logoPreferences");
    }
    // Step 2: Website
    if (formData.wantsWebsite) {
      visibleSteps.push("websiteQuestions");
    }
    // Step 3: Typography (we might show this if either branding or website is chosen)
    if (formData.wantsBranding || formData.wantsWebsite) {
      visibleSteps.push("typography");
    }
    // Step 4: Additional info & contact
    visibleSteps.push("additionalContact");

    return visibleSteps;
  };

  const visibleSteps = getVisibleSteps();

  // Return the "slug" of the current step
  const currentStepSlug = visibleSteps[currentStep] || "welcome";

  // On final step, we actually submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      if (res.ok) {
        setSuccess(true);
        // Reset
        setFormData({
          wantsBranding: false,
          wantsWebsite: false,
          businessName: "",
          businessDescription: "",
          targetAudience: "",
          brandPersonality: "",
          tagline: "",
          businessValues: "",
          logoIdeas: "",
          logoStyles: [],
          logoStyleOther: "",
          logoColors: "",
          websitePages: "",
          customPages: "",
          websiteLanguages: [],
          websiteLanguagesOther: "",
          websiteStylePreference: "",
          websiteStyleOther: "",
          admiredWebsites: "",
          websiteColors: "",
          websiteFunctionalities: "",
          preferredTypography: "",
          preferredTypographyOther: "",
          additionalInfo: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
        });
        setCurrentStep(0);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
    setSubmitting(false);
  };

  // Render the current step’s component
  const renderStep = () => {
    switch (currentStepSlug) {
      case "welcome":
        return (
          <StepWelcome
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case "brandEssentials":
        return (
          <StepBrandEssentials
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "logoPreferences":
        return (
          <StepLogoPreferences
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "websiteQuestions":
        return (
          <StepWebsiteQuestions
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "typography":
        return (
          <StepTypography
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "additionalContact":
        return (
          <StepAdditionalContact
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            submitting={submitting}
            success={success}
          />
        );
      default:
        return null;
    }
  };

  // Build a progress indicator (optional).
  // For simplicity, we only show circles for the *visible* steps, not the entire steps array.
  const StepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {visibleSteps.map((slug, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          let circleStyle =
            "flex items-center justify-center w-8 h-8 rounded-full text-white mx-1";
          if (isActive) {
            circleStyle += " bg-analogAccent";
          } else if (isCompleted) {
            circleStyle += " bg-analogMain";
          } else {
            circleStyle += " bg-gray-300";
          }

          return (
            <div key={slug} className="flex items-center">
              <div className={circleStyle}>{index + 1}</div>
              {index < visibleSteps.length - 1 && (
                <div className="w-4 h-1 bg-gray-300 mx-1 md:mx-2"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Brand &amp; Identity Inquiry | Analog</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat&family=Open+Sans&family=Roboto&family=Nunito&family=Pacifico&family=Merriweather&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar */}
      <nav className="bg-analogMain shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="https://analog.krd" className="flex items-center">
              <Image
                className="h-10 w-auto"
                src="/analog-logo.svg"
                alt="Analog Logo"
                width={200}
                height={40}
              />
            </a>
            <div>
              <a
                href="https://analog.krd"
                className="text-white font-medium hover:text-analogAccent"
              >
                Back to Analog
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
          <h1 className="text-3xl font-bold text-center text-analogMain mb-4">
            Brand &amp; Identity Inquiry
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Please follow the steps below to help us understand your needs.
          </p>

          {/* Step Indicator */}
          <StepIndicator />

          {/* Render Current Step */}
          {renderStep()}
        </div>
        <footer className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Analog. All rights reserved.
        </footer>
      </div>
    </>
  );
}
