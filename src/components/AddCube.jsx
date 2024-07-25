import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCubeDetails } from '../utils/cubeScraper';
import { toast } from "sonner";

const AddCube = ({ onAddCube }) => {
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const cubeDetails = await fetchCubeDetails(link);
      onAddCube(cubeDetails);
      setLink('');
      toast.success('Cube added successfully!');
    } catch (error) {
      console.error('Error adding cube:', error);
      toast.error(error.message || 'Failed to add cube. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Cube'}
        </Button>
      </div>
    </form>
  );
};

export default AddCube;