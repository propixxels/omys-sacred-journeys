
import { Button } from "@/components/ui/button";
import { useTourEditor } from "@/hooks/useTourEditor";
import BasicInformationSection from "@/components/tour-editor/BasicInformationSection";
import ImageSection from "@/components/tour-editor/ImageSection";
import ListInputSection from "@/components/tour-editor/ListInputSection";
import ItinerarySection from "@/components/tour-editor/ItinerarySection";
import AccommodationSection from "@/components/tour-editor/AccommodationSection";
import MealsSection from "@/components/tour-editor/MealsSection";
import TransportSection from "@/components/tour-editor/TransportSection";
import PricingSection from "@/components/tour-editor/PricingSection";

interface TourEditorProps {
  tourId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const TourEditor = ({ tourId, onSave, onCancel }: TourEditorProps) => {
  const { tourData, setTourData, loading, saveTour } = useTourEditor(tourId);

  const handleSubmit = async (isDraft: boolean = false) => {
    const success = await saveTour(isDraft);
    if (success) {
      onSave();
    }
  };

  const updateTourData = (updates: Partial<typeof tourData>) => {
    setTourData(prev => ({ ...prev, ...updates }));
  };

  if (loading && tourId) {
    return <div className="flex justify-center p-8">Loading tour data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <BasicInformationSection 
        tourData={tourData} 
        onUpdate={updateTourData} 
      />

      <ImageSection 
        tourData={tourData} 
        onUpdate={updateTourData} 
      />

      <ListInputSection
        title="Tour Highlights"
        items={tourData.highlights}
        onUpdate={(highlights) => updateTourData({ highlights })}
        placeholder="Tour highlight"
      />

      <ItinerarySection
        itinerary={tourData.itinerary}
        onUpdate={(itinerary) => updateTourData({ itinerary })}
      />

      <AccommodationSection
        accommodation={tourData.accommodation}
        onUpdate={(accommodation) => updateTourData({ accommodation })}
      />

      <MealsSection
        meals={tourData.meals}
        onUpdate={(meals) => updateTourData({ meals })}
      />

      <TransportSection
        transport={tourData.transport}
        onUpdate={(transport) => updateTourData({ transport })}
      />

      <ListInputSection
        title="Spiritual Arrangements"
        items={tourData.spiritualArrangements}
        onUpdate={(spiritualArrangements) => updateTourData({ spiritualArrangements })}
        placeholder="Spiritual arrangement"
      />

      <ListInputSection
        title="Inclusions"
        items={tourData.inclusions}
        onUpdate={(inclusions) => updateTourData({ inclusions })}
        placeholder="What's included"
      />

      <ListInputSection
        title="Exclusions"
        items={tourData.exclusions}
        onUpdate={(exclusions) => updateTourData({ exclusions })}
        placeholder="What's not included"
      />

      <PricingSection
        pricing={tourData.pricing}
        onUpdate={(pricing) => updateTourData({ pricing })}
      />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 sticky bottom-4 bg-white p-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSubmit(true)}
          disabled={loading}
        >
          Save as Draft
        </Button>
        <Button 
          onClick={() => handleSubmit(false)}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Saving..." : tourId ? "Update Tour" : "Create Tour"}
        </Button>
      </div>
    </div>
  );
};

export default TourEditor;
