
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ListInputSectionProps {
  title: string;
  items: string[];
  onUpdate: (items: string[]) => void;
  placeholder?: string;
}

const ListInputSection = ({ title, items, onUpdate, placeholder = "Enter item" }: ListInputSectionProps) => {
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onUpdate(newItems);
  };

  const addItem = () => {
    onUpdate([...items, ""]);
  };

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={addItem}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {title.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListInputSection;
