
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TourEditor from "@/components/TourEditor";

const AddTour = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          <h1 className="text-4xl font-temple font-bold text-temple-maroon">
            Add New Tour
          </h1>
        </div>

        <TourEditor 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default AddTour;
