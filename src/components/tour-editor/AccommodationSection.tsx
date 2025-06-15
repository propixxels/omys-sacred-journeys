
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TourData } from "@/types/tour";

interface AccommodationSectionProps {
  accommodation: TourData['accommodation'];
  onUpdate: (accommodation: TourData['accommodation']) => void;
}

const AccommodationSection = ({ accommodation, onUpdate }: AccommodationSectionProps) => {
  const updateListItem = (field: 'hotels' | 'amenities', index: number, value: string) => {
    const newArray = [...accommodation[field]];
    newArray[index] = value;
    onUpdate({ ...accommodation, [field]: newArray });
  };

  const addListItem = (field: 'hotels' | 'amenities') => {
    onUpdate({ ...accommodation, [field]: [...accommodation[field], ""] });
  };

  const removeListItem = (field: 'hotels' | 'amenities', index: number) => {
    const newArray = accommodation[field].filter((_, i) => i !== index);
    onUpdate({ ...accommodation, [field]: newArray });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accommodation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Room Type</Label>
          <Input
            value={accommodation.roomType}
            onChange={(e) => onUpdate({ ...accommodation, roomType: e.target.value })}
            placeholder="e.g., Double/Triple Sharing"
          />
        </div>
        
        <div>
          <Label>Hotels</Label>
          {accommodation.hotels.map((hotel, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <Input
                value={hotel}
                onChange={(e) => updateListItem('hotels', index, e.target.value)}
                placeholder="Hotel name"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeListItem('hotels', index)}
                disabled={accommodation.hotels.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addListItem('hotels')}
            className="w-full mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </div>

        <div>
          <Label>Amenities</Label>
          {accommodation.amenities.map((amenity, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <Input
                value={amenity}
                onChange={(e) => updateListItem('amenities', index, e.target.value)}
                placeholder="Amenity"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeListItem('amenities', index)}
                disabled={accommodation.amenities.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addListItem('amenities')}
            className="w-full mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Amenity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationSection;
