
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactDetails = [
  {
    icon: <Phone className="w-6 h-6 text-white" />,
    title: "Phone",
    lines: [
      { text: "+91 73488 69099", className: "font-medium" },
      { text: "24/7 Travel Support", className: "text-sm text-gray-500" }
    ]
  },
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    title: "Email",
    lines: [
      { text: "connect@omytravels.com", className: "font-medium" },
      { text: "Quick Response", className: "text-sm text-gray-500" }
    ]
  },
  {
    icon: <MapPin className="w-6 h-6 text-white" />,
    title: "Address",
    lines: [
      { text: "Dhundasi Nagar Rd", className: "" },
      { text: "Sirsi, Karnataka 581401", className: "" }
    ]
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Working Hours",
    lines: [
      { text: "9am to 6pm", className: "" },
      { text: "Sunday closed", className: "text-sm text-gray-500" }
    ]
  }
];

const ContactInfoCards = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-temple font-bold text-temple-maroon mb-6">
        Get In Touch
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        We're here to assist you with all your travel needs. 
        Reach out to us for personalized tour experiences and expert guidance for your perfect getaway.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {contactDetails.map((card, i) => (
        <Card className="border-orange-200 hover:shadow-lg transition-shadow" key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div>
                <h3 className="font-semibold text-temple-maroon mb-1">{card.title}</h3>
                {card.lines.map((line, idx) => (
                  <p key={idx} className={`text-gray-700 ${line.className}`}>{line.text}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ContactInfoCards;
