import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CubeEditModal = ({ cube, onSave, onClose }) => {
  const [editedCube, setEditedCube] = useState({ ...cube });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCube(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (feature) => {
    setEditedCube(prev => {
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
    onSave(editedCube);
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cube</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={editedCube.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={editedCube.price} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input id="type" name="type" value={editedCube.type} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">Size (mm)</Label>
              <Input id="size" name="size" value={editedCube.size} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Features</Label>
              <div className="col-span-3 space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <Label htmlFor={feature} className="flex-grow">{feature}</Label>
                    <Switch
                      id={feature}
                      checked={editedCube.features.includes(feature)}
                      onCheckedChange={() => handleToggleChange(feature)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CubeEditModal;