import { useState, useEffect } from 'react';
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
    type: '',
    size: '',
    features: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCubeDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature) => {
    setCubeDetails(prev => {
      let newFeatures = [...prev.features];
      if (feature === 'Core to Corner Magnets') {
        newFeatures = newFeatures.filter(f => f !== 'Magnets');
        if (!newFeatures.includes(feature)) {
          newFeatures.push(feature);
        } else {
          newFeatures = newFeatures.filter(f => f !== feature);
        }
      } else if (feature === 'Magnets' && newFeatures.includes('Core to Corner Magnets')) {
        return prev;
      } else {
        if (newFeatures.includes(feature)) {
          newFeatures = newFeatures.filter(f => f !== feature);
        } else {
          newFeatures.push(feature);
        }
      }
      return { ...prev, features: newFeatures };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cubeDetails.name || !cubeDetails.price || !cubeDetails.type) {
      toast.error('Name, price, and cube type are required');
      return;
    }
    onAddCube({ ...cubeDetails, id: Date.now(), price: parseFloat(cubeDetails.price) });
    setIsOpen(false);
    setCubeDetails({ name: '', price: '', image: '', type: '', size: '', features: [] });
    toast.success('Cube added successfully!');
  };

  const features = [
    'Core to Corner Magnets',
    'Magnets',
    'Stickerless',
    'Frosted Plastic',
    'Adjustable Magnets',
    'Dual Adjustment System',
    'Ridged Edges',
    'Corner-Core Magnets',
    'Maglev',
    'UV Coated'
  ];

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
            <Label htmlFor="type">Cube Type</Label>
            <Input id="type" name="type" value={cubeDetails.type} onChange={handleInputChange} placeholder="e.g., 3x3, 4x4" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size (mm)</Label>
            <Input id="size" name="size" value={cubeDetails.size} onChange={handleInputChange} placeholder="e.g., 56" />
          </div>
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {features.map((feature) => (
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