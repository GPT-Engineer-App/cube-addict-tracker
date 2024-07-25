import { useState } from 'react';
import AddCube from '../components/AddCube';
import CubeList from '../components/CubeList';
import SortCubes from '../components/SortCubes';

const Index = () => {
  const [cubes, setCubes] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  const addCube = (newCube) => {
    setCubes([...cubes, newCube]);
  };

  const editCube = (id, updatedCube) => {
    setCubes(cubes.map(cube => cube.id === id ? updatedCube : cube));
  };

  const deleteCube = (id) => {
    setCubes(cubes.filter(cube => cube.id !== id));
  };

  const sortCubes = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Speedcube Wishlist</h1>
        <p className="text-xl text-gray-600">Track and manage your speedcube collection</p>
      </header>
      <main>
        <div className="flex justify-between items-center mb-8">
          <AddCube onAddCube={addCube} />
          <SortCubes onSort={sortCubes} />
        </div>
        <CubeList 
          cubes={cubes} 
          onEditCube={editCube} 
          onDeleteCube={deleteCube} 
          sortOption={sortOption}
        />
      </main>
    </div>
  );
};

export default Index;