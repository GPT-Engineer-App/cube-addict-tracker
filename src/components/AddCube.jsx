import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const AddCube = ({ onAddCube }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cubeDetails, setCubeDetails] = useState({
    name: '',
    price: '',
    image: '',
    size: '',
    features: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCubeDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature) => {
    setCubeDetails(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cubeDetails.name || !cubeDetails.price) {
      toast.error('Name and price are required');
      return;
    }
    onAddCube({ ...cubeDetails, id: Date.now(), price: parseFloat(cubeDetails.price) });
    setIsOpen(false);
    setCubeDetails({ name: '', price: '', image: '', size: '', features: [] });
    toast.success('Cube added successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Cube</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Cube</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={cubeDetails.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" value={cubeDetails.price} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" value={cubeDetails.image} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input id="size" name="size" value={cubeDetails.size} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {['Maglev', 'Core to Corner Magnets', 'Magnets'].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={cubeDetails.features.includes(feature)}
                    onCheckedChange={() => handleCheckboxChange(feature)}
                  />
                  <Label htmlFor={feature}>{feature}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Add Cube</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCube;