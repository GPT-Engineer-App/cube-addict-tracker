import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddCube = ({ onAddCube }) => {
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement fetching cube details from the link
    const cubeDetails = await fetchCubeDetails(link);
    onAddCube(cubeDetails);
    setLink('');
  };

  // Placeholder function for fetching cube details
  const fetchCubeDetails = async (link) => {
    // TODO: Implement actual fetching logic
    return {
      id: Date.now(),
      name: 'Sample Cube',
      price: 19.99,
      image: '/placeholder.svg',
      size: '3x3',
      features: ['Magnetic', 'Stickerless']
    };
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <Input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste speedcubeshop.com or thecubicle.com link"
          className="flex-grow"
        />
        <Button type="submit">Add Cube</Button>
      </div>
    </form>
  );
};

export default AddCube;