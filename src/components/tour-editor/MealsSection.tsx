
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TourData } from "@/types/tour";

interface MealsSectionProps {
  meals: TourData['meals'];
  onUpdate: (meals: TourData['meals']) => void;
}

const MealsSection = ({ meals, onUpdate }: MealsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Included Meals</Label>
          <Input
            value={meals.included}
            onChange={(e) => onUpdate({ ...meals, included: e.target.value })}
            placeholder="e.g., Breakfast, Lunch, Dinner"
          />
        </div>
        <div>
          <Label>Special Dietary Options</Label>
          <Input
            value={meals.special}
            onChange={(e) => onUpdate({ ...meals, special: e.target.value })}
            placeholder="e.g., Vegetarian, Jain food available"
          />
        </div>
        <div>
          <Label>Meal Notes</Label>
          <Textarea
            value={meals.note}
            onChange={(e) => onUpdate({ ...meals, note: e.target.value })}
            placeholder="Additional meal information"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MealsSection;
