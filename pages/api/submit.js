// pages/api/submit.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { formData } = req.body;

  // Build an email text summarizing all the data
  const wantsBranding = formData.wantsBranding ? "Yes" : "No";
  const wantsWebsite = formData.wantsWebsite ? "Yes" : "No";

  const emailContent = `
New Brand & Website Inquiry:

Services:
- Wants Branding: ${wantsBranding}
- Wants Website: ${wantsWebsite}

Branding:
- Business Name: ${formData.businessName}
- Description: ${formData.businessDescription}
- Target Audience: ${formData.targetAudience}
- Brand Personality: ${formData.brandPersonality}
- Tagline: ${formData.tagline}
- Values: ${formData.businessValues}

Logo Preferences:
- Logo Ideas: ${formData.logoIdeas}
- Logo Styles: ${formData.logoStyles} ${
    formData.logoStyleOther ? "(Other: " + formData.logoStyleOther + ")" : ""
  }
- Logo Colors: ${formData.logoColors}

Website:
- Pages: ${formData.websitePages} ${
    formData.customPages ? "(Custom: " + formData.customPages + ")" : ""
  }
- Languages: ${formData.websiteLanguages.join(", ")} ${
    formData.websiteLanguagesOther
      ? "(Other: " + formData.websiteLanguagesOther + ")"
      : ""
  }
- Website Style Preference: ${formData.websiteStylePreference} ${
    formData.websiteStyleOther
      ? "(Other: " + formData.websiteStyleOther + ")"
      : ""
  }
- Admired Websites: ${formData.admiredWebsites}
- Website Colors: ${formData.websiteColors}
- Functionalities: ${formData.websiteFunctionalities}

Typography:
- Preferred Typography: ${formData.preferredTypography} ${
    formData.preferredTypographyOther
      ? "(Other: " + formData.preferredTypographyOther + ")"
      : ""
  }

Additional Info:
${formData.additionalInfo}

Contact:
- Name: ${formData.contactName}
- Email: ${formData.contactEmail}
- Phone: ${formData.contactPhone}
  `;

  // Configure transporter
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Analog Brand Form" <${process.env.SMTP_USER}>`,
      to: "barez@analog.krd",
      subject: `${formData.businessName}: New Brand/Website Inquiry`,
      text: emailContent,
    });
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
}
