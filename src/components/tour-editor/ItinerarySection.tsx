
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TourData } from "@/types/tour";

interface ItinerarySectionProps {
  itinerary: TourData['itinerary'];
  onUpdate: (itinerary: TourData['itinerary']) => void;
}

const ItinerarySection = ({ itinerary, onUpdate }: ItinerarySectionProps) => {
  const updateItinerary = (index: number, field: 'title' | 'day', value: string | number) => {
    const newItinerary = itinerary.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate(newItinerary);
  };

  const updateItineraryActivity = (dayIndex: number, activityIndex: number, value: string) => {
    const newItinerary = itinerary.map((item, i) => 
      i === dayIndex 
        ? { 
            ...item, 
            activities: item.activities.map((activity, j) => 
              j === activityIndex ? value : activity
            ) 
          }
        : item
    );
    onUpdate(newItinerary);
  };

  const addItineraryActivity = (dayIndex: number) => {
    const newItinerary = itinerary.map((item, i) => 
      i === dayIndex 
        ? { ...item, activities: [...item.activities, ""] }
        : item
    );
    onUpdate(newItinerary);
  };

  const removeItineraryActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = itinerary.map((item, i) => 
      i === dayIndex 
        ? { ...item, activities: item.activities.filter((_, j) => j !== activityIndex) }
        : item
    );
    onUpdate(newItinerary);
  };

  const addItineraryDay = () => {
    onUpdate([...itinerary, { day: itinerary.length + 1, title: "", activities: [""] }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Day Number</Label>
                <Input
                  type="number"
                  value={day.day}
                  onChange={(e) => updateItinerary(dayIndex, 'day', parseInt(e.target.value) || 1)}
                />
              </div>
              <div>
                <Label>Day Title</Label>
                <Input
                  value={day.title}
                  onChange={(e) => updateItinerary(dayIndex, 'title', e.target.value)}
                  placeholder="e.g., Arrival at Haridwar"
                />
              </div>
            </div>
            
            <div>
              <Label>Activities</Label>
              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex space-x-2 mt-2">
                  <Input
                    value={activity}
                    onChange={(e) => updateItineraryActivity(dayIndex, activityIndex, e.target.value)}
                    placeholder="Activity description"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItineraryActivity(dayIndex, activityIndex)}
                    disabled={day.activities.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addItineraryActivity(dayIndex)}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={addItineraryDay}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Day
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItinerarySection;
