
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TourData } from "@/types/tour";

interface BasicInformationSectionProps {
  tourData: TourData;
  onUpdate: (data: Partial<TourData>) => void;
}

const BasicInformationSection = ({ tourData, onUpdate }: BasicInformationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Tour Name *</Label>
            <Input
              id="name"
              value={tourData.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g., Kedarnath Yatra"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration *</Label>
            <Input
              id="duration"
              value={tourData.duration}
              onChange={(e) => onUpdate({ duration: e.target.value })}
              placeholder="e.g., 7 Days / 6 Nights"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={tourData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Brief description of the tour"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cost">Cost (₹) *</Label>
            <Input
              id="cost"
              type="number"
              value={tourData.cost}
              onChange={(e) => onUpdate({ cost: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 25999"
            />
          </div>
          <div>
            <Label htmlFor="departure_date">Departure Date *</Label>
            <Input
              id="departure_date"
              type="date"
              value={tourData.departure_date}
              onChange={(e) => onUpdate({ departure_date: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="next_departure">Next Departure</Label>
            <Input
              id="next_departure"
              type="date"
              value={tourData.next_departure}
              onChange={(e) => onUpdate({ next_departure: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="destinations">Destinations</Label>
            <Textarea
              id="destinations"
              value={tourData.destinations}
              onChange={(e) => onUpdate({ destinations: e.target.value })}
              placeholder="List of destinations"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="transport_mode">Transport Mode</Label>
            <Select 
              value={tourData.transport_mode} 
              onValueChange={(value) => onUpdate({ transport_mode: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cost_details">Cost Details</Label>
            <Textarea
              id="cost_details"
              value={tourData.cost_details}
              onChange={(e) => onUpdate({ cost_details: e.target.value })}
              placeholder="Additional cost information"
              rows={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={tourData.rating || ''}
              onChange={(e) => onUpdate({ rating: parseFloat(e.target.value) || null })}
              placeholder="e.g., 4.5"
            />
          </div>
          <div>
            <Label htmlFor="pilgrims_count">Pilgrims Count</Label>
            <Input
              id="pilgrims_count"
              type="number"
              value={tourData.pilgrims_count || ''}
              onChange={(e) => onUpdate({ pilgrims_count: parseInt(e.target.value) || null })}
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={tourData.slug}
              onChange={(e) => onUpdate({ slug: e.target.value })}
              placeholder="auto-generated from name"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformationSection;
