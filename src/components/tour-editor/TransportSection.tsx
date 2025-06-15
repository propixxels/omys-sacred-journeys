
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TourData } from "@/types/tour";

interface TransportSectionProps {
  transport: TourData['transport'];
  onUpdate: (transport: TourData['transport']) => void;
}

const TransportSection = ({ transport, onUpdate }: TransportSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Pickup Point</Label>
            <Input
              value={transport.pickup}
              onChange={(e) => onUpdate({ ...transport, pickup: e.target.value })}
              placeholder="e.g., Delhi Railway Station"
            />
          </div>
          <div>
            <Label>Drop Point</Label>
            <Input
              value={transport.drop}
              onChange={(e) => onUpdate({ ...transport, drop: e.target.value })}
              placeholder="e.g., Delhi Railway Station"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Vehicle Type</Label>
            <Input
              value={transport.vehicle}
              onChange={(e) => onUpdate({ ...transport, vehicle: e.target.value })}
              placeholder="e.g., AC Bus, Tempo Traveller"
            />
          </div>
          <div>
            <Label>Luggage Policy</Label>
            <Input
              value={transport.luggage}
              onChange={(e) => onUpdate({ ...transport, luggage: e.target.value })}
              placeholder="e.g., 15kg per person"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportSection;
