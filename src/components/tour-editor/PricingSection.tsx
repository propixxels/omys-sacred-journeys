
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TourData } from "@/types/tour";

interface PricingSectionProps {
  pricing: TourData['pricing'];
  onUpdate: (pricing: TourData['pricing']) => void;
}

const PricingSection = ({ pricing, onUpdate }: PricingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Double/Triple Sharing</Label>
            <Input
              value={pricing.doubleSharing}
              onChange={(e) => onUpdate({ ...pricing, doubleSharing: e.target.value })}
              placeholder="e.g., ₹25,999 per person"
            />
          </div>
          <div>
            <Label>Single Room Supplement</Label>
            <Input
              value={pricing.singleSupplement}
              onChange={(e) => onUpdate({ ...pricing, singleSupplement: e.target.value })}
              placeholder="e.g., ₹5,000 extra"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Child (5-12 years)</Label>
            <Input
              value={pricing.child5to12}
              onChange={(e) => onUpdate({ ...pricing, child5to12: e.target.value })}
              placeholder="e.g., 75% of adult price"
            />
          </div>
          <div>
            <Label>Group Discount</Label>
            <Input
              value={pricing.groupDiscount}
              onChange={(e) => onUpdate({ ...pricing, groupDiscount: e.target.value })}
              placeholder="e.g., 10% off for groups of 10+"
            />
          </div>
          <div>
            <Label>Early Bird Discount</Label>
            <Input
              value={pricing.earlyBird}
              onChange={(e) => onUpdate({ ...pricing, earlyBird: e.target.value })}
              placeholder="e.g., 5% off for bookings 60 days prior"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSection;
