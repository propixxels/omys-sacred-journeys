
import { Shield, MapPin, Heart, Users } from "lucide-react";

const QuickValuesBar = () => (
  <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="hidden md:flex flex-wrap justify-center gap-8 text-white">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span className="font-medium">100% Trusted by Travelers</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">Comfortable AC Transport</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span className="font-medium">Quality Accommodations</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span className="font-medium">Expert Local Guides</span>
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex animate-[slide-left_15s_linear_infinite] text-white">
          <div className="flex items-center space-x-8 whitespace-nowrap">
            {/* Mobile content duplicated for seamless sliding */}
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">100% Trusted by Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Comfortable AC Transport</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Quality Accommodations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Expert Local Guides</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">100% Trusted by Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Comfortable AC Transport</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Quality Accommodations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Expert Local Guides</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QuickValuesBar;
