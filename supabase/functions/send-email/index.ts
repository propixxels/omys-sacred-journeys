
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ALL_DESTINATIONS = [
  "connect@omytravels.in",
  "omytravelsweb@gmail.com"
];

// Function to verify reCAPTCHA (returns full result for better debugging)
async function verifyRecaptcha(token: string): Promise<any> {
  const secretKey = Deno.env.get("RECAPTCHA_SECRET_KEY");

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not found");
    return { success: false, error: "missing_secret" };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const result = await response.json();
    console.log("reCAPTCHA verification result:", result);

    return result;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, error: "verification_error", details: String(error) };
  }
}

// Function to send email using SMTP2GO API
async function sendEmailViaSMTP2GO(emailData: any): Promise<any> {
  const apiKey = Deno.env.get("SMTP_PASSWORD");

  if (!apiKey) {
    throw new Error("SMTP2GO API key not configured");
  }

  console.log("Using SMTP2GO API to send email");

  const response = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smtp2go-Api-Key": apiKey,
    },
    body: JSON.stringify({
      sender: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html_body: emailData.html,
      text_body: emailData.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("SMTP2GO API error:", response.status, errorText);
    throw new Error(`SMTP2GO API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log("SMTP2GO API response:", result);
  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let reqBody;
  try {
    reqBody = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const { type, name, email, phone, message, to, subject, html, recaptchaToken } = reqBody;

  // Handle reCAPTCHA verification requests
  if (type === "verify-recaptcha") {
    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({ success: false, error: "No reCAPTCHA token provided" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await verifyRecaptcha(recaptchaToken);
    const status = result.success ? 200 : 400;
    return new Response(
      JSON.stringify({ success: !!result.success, details: result }),
      { status, headers: corsHeaders }
    );
  }

  if (type !== "newsletter" && recaptchaToken) {
    const result = await verifyRecaptcha(recaptchaToken);

    // Allow dev/preview environments to bypass if domain is lovable.dev (for testing only)
    const referer = req.headers.get("referer") || "";
    let hostname = "";
    try { hostname = referer ? new URL(referer).hostname : ""; } catch (_) {}

    const isSandbox = hostname.endsWith("lovable.dev") || hostname.endsWith("sandbox.lovable.dev");

    if (!result.success && !isSandbox) {
      return new Response(
        JSON.stringify({ success: false, error: "reCAPTCHA verification failed", details: result }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!result.success && isSandbox) {
      console.warn("Bypassing reCAPTCHA in sandbox preview:", { hostname, details: result });
    }
  }

  // Fixed sender email format - ensure it's a proper email address
  const fromEmail = "noreply@omytravels.in";

  // Create email content
  let emailContent: any = {};

  if (type === "contact" || type === "enquiry") {
    emailContent = {
      from: fromEmail,
      to: ALL_DESTINATIONS,
      subject: type === "enquiry" ? "Enquiry Form Submission" : "Contact Form Submission",
      text: `
New ${type} form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
      html: `
        <h2>New ${type} form submission</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Phone:</b> ${phone}</li>
        </ul>
        <div style="margin-top:10px"><b>Message:</b><br/>${message}</div>
      `,
    };
  } else if (type === "newsletter") {
    if (!subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing newsletter fields" }),
        { status: 400, headers: corsHeaders }
      );
    }
    emailContent = {
      from: fromEmail,
      to: ALL_DESTINATIONS,
      subject,
      html,
    };
  } else if (type === "booking") {
    emailContent = {
      from: fromEmail,
      to: ALL_DESTINATIONS,
      subject: subject || "New Booking Request",
      text: message || "A new booking was received.",
      html: html ||
        `<div>
          <h2>New Booking Request</h2>
          <ul>
            ${name ? `<li><b>Name:</b> ${name}</li>` : ""}
            ${email ? `<li><b>Email:</b> ${email}</li>` : ""}
            ${phone ? `<li><b>Phone:</b> ${phone}</li>` : ""}
          </ul>
          ${message ? `<div><b>Message:</b><br/>${message}</div>` : ""}
        </div>`,
    };
  } else {
    return new Response(
      JSON.stringify({ error: "Unknown email type" }),
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    console.log("Attempting to send email via SMTP2GO API");
    
    const result = await sendEmailViaSMTP2GO(emailContent);
    console.log("Email sent successfully via SMTP2GO:", result);
    
    return new Response(
      JSON.stringify({ success: true, messageId: result.data?.email_id || result.email_id }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
