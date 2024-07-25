import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CubeEditModal from './CubeEditModal';

const CubeList = ({ cubes, onEditCube, onDeleteCube, sortOption }) => {
  const [editingCube, setEditingCube] = useState(null);

  const sortedCubes = [...cubes].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'size') return a.size.localeCompare(b.size);
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedCubes.map(cube => (
        <Card key={cube.id}>
          <CardHeader>
            <CardTitle>{cube.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={cube.image} alt={cube.name} className="w-full h-48 object-cover mb-4" />
            <p>Price: ${cube.price}</p>
            <p>Size: {cube.size}</p>
            <p>Features: {cube.features.join(', ')}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => setEditingCube(cube)}>Edit</Button>
            <Button variant="destructive" onClick={() => onDeleteCube(cube.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
      {editingCube && (
        <CubeEditModal
          cube={editingCube}
          onSave={(updatedCube) => {
            onEditCube(editingCube.id, updatedCube);
            setEditingCube(null);
          }}
          onClose={() => setEditingCube(null)}
        />
      )}
    </div>
  );
};

export default CubeList;