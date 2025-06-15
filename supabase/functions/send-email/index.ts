
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.11";

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
    console.error("SMTP secret(s) missing", { host, port, user, pass });
    return new Response(
      JSON.stringify({ error: "SMTP credentials not configured" }),
      { status: 401, headers: corsHeaders }
    );
  }

  const transporter = nodemailer.createTransporter({
    host,
    port: parseInt(port ?? "2525"),
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  let mailOptions: Record<string, any> = {};

  if (type === "contact" || type === "enquiry") {
    mailOptions = {
      from: `"Omy Travels Contact Form" <connect@omytravels.in>`, // Fixed sender address
      replyTo: email, // Set reply-to as the user's email
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
    mailOptions = {
      from: `"Omy Travels" <connect@omytravels.in>`, // Fixed sender address
      to: ALL_DESTINATIONS,
      subject,
      html,
    };
  } else if (type === "booking") {
    // Assume a booking payload with details similar to contact
    mailOptions = {
      from: `"Omy Travels Booking" <connect@omytravels.in>`, // Fixed sender address
      replyTo: email || undefined, // Set reply-to if email provided
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
    console.log("Attempting to send email with options:", { 
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject 
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    
    return new Response(
      JSON.stringify({ success: true, messageId: info.messageId }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
