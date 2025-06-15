
import React from "react";

const ContactMapSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-temple font-bold text-temple-maroon mb-4">
          Find Us
        </h2>
        <p className="text-gray-600 text-lg">
          Visit our office in Sirsi, Karnataka for personalized travel consultation
        </p>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.5234567890123!2d74.83456789!3d14.62123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM3JzE2LjQiTiA3NMKwNTAnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Omy Travels Location - Sirsi, Karnataka"
        />
      </div>
    </div>
  </section>
);

export default ContactMapSection;
