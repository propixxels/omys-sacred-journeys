
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.11";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

  // Determine email purpose based on request body shape/type
  const { type, name, email, phone, message, to, subject, html } = reqBody;

  // Setup nodemailer with SMTP
  const transporter = nodemailer.createTransport({
    host: Deno.env.get("SMTP_HOST"),
    port: parseInt(Deno.env.get("SMTP_PORT") ?? "2525"),
    secure: false, // not SSL by default
    auth: {
      user: Deno.env.get("SMTP_USERNAME"),
      pass: Deno.env.get("SMTP_PASSWORD"),
    },
  });

  // Fallbacks for general email sending
  let mailOptions: Record<string, any> = {};

  if (type === "contact") {
    mailOptions = {
      from: `"${name}" <${email}>`,
      to: "connect@omytravels.com", // receives contact form
      subject: "Contact Form Submission",
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
      html: `
        <h2>New contact form submission</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Phone:</b> ${phone}</li>
        </ul>
        <div style="margin-top:10px"><b>Message:</b><br/>${message}</div>
      `,
    };
  } else if (type === "newsletter") {
    // For newsletters - use 'to', 'subject', 'html'
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing newsletter fields" }),
        { status: 400, headers: corsHeaders }
      );
    }
    mailOptions = {
      from: "Omy Travels <connect@omytravels.com>",
      to,
      subject,
      html,
    };
  } else {
    return new Response(
      JSON.stringify({ error: "Unknown email type" }),
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const info = await transporter.sendMail(mailOptions);
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
