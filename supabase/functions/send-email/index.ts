

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

// Function to verify reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = Deno.env.get("RECAPTCHA_SECRET_KEY");
  
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not found");
    return false;
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
    
    return result.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

// Function to send email using SMTP
async function sendEmailViaSMTP(emailData: any): Promise<any> {
  const host = Deno.env.get("SMTP_HOST");
  const port = Deno.env.get("SMTP_PORT");
  const user = Deno.env.get("SMTP_USERNAME");
  const pass = Deno.env.get("SMTP_PASSWORD");

  console.log("SMTP config:", { host, port, user: user ? "***" : "missing" });

  // Create email payload for a generic SMTP API service
  const emailPayload = {
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
    text: emailData.text,
  };

  console.log("Sending email with payload:", {
    from: emailPayload.from,
    to: emailPayload.to,
    subject: emailPayload.subject
  });

  // Try different SMTP service APIs based on the host
  if (host?.includes("smtp2go")) {
    // SMTP2GO API
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": pass!,
      },
      body: JSON.stringify({
        sender: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        html_body: emailPayload.html,
        text_body: emailPayload.text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SMTP2GO API error:", response.status, errorText);
      throw new Error(`SMTP2GO API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } else if (host?.includes("sendgrid") || host?.includes("smtp.sendgrid.net")) {
    // SendGrid API
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${pass}`,
      },
      body: JSON.stringify({
        personalizations: [{
          to: emailPayload.to.map((email: string) => ({ email })),
        }],
        from: { email: emailPayload.from },
        subject: emailPayload.subject,
        content: [
          {
            type: "text/html",
            value: emailPayload.html || emailPayload.text,
          },
          {
            type: "text/plain",
            value: emailPayload.text || "",
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid API error:", response.status, errorText);
      throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
    }

    return { success: true, provider: "sendgrid" };
  } else {
    // Generic SMTP - use a simple email service or fallback
    console.log("Using generic SMTP fallback");
    
    // For now, let's use a simple HTTP-based email service
    // You might need to replace this with your actual SMTP service API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${pass}`,
      },
      body: JSON.stringify({
        from: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        html: emailPayload.html,
        text: emailPayload.text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email service API error:", response.status, errorText);
      throw new Error(`Email service error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }
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

    const isValid = await verifyRecaptcha(recaptchaToken);
    return new Response(
      JSON.stringify({ success: isValid }),
      { status: isValid ? 200 : 400, headers: corsHeaders }
    );
  }

  // Verify reCAPTCHA for all other email types (except newsletter which handles its own verification)
  if (type !== "newsletter" && recaptchaToken) {
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return new Response(
        JSON.stringify({ success: false, error: "reCAPTCHA verification failed" }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  // Fetch SMTP creds and log if missing
  const host = Deno.env.get("SMTP_HOST");
  const port = Deno.env.get("SMTP_PORT");
  const user = Deno.env.get("SMTP_USERNAME");
  const pass = Deno.env.get("SMTP_PASSWORD");

  if (!host || !port || !user || !pass) {
    console.error("SMTP secret(s) missing", { host, port, user: user ? "***" : "missing", pass: pass ? "***" : "missing" });
    return new Response(
      JSON.stringify({ error: "SMTP credentials not configured" }),
      { status: 401, headers: corsHeaders }
    );
  }

  // Create email content
  let emailContent: any = {};

  if (type === "contact" || type === "enquiry") {
    emailContent = {
      from: user, // Use SMTP username as sender
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
      from: user,
      to: ALL_DESTINATIONS,
      subject,
      html,
    };
  } else if (type === "booking") {
    emailContent = {
      from: user,
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
    console.log("Attempting to send email with SMTP transport");
    
    const result = await sendEmailViaSMTP(emailContent);
    console.log("Email sent successfully:", result);
    
    return new Response(
      JSON.stringify({ success: true, messageId: result.data?.id || result.id }),
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

