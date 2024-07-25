import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SortCubes = ({ onSort }) => {
  return (
    <div className="mb-6">
      <Select onValueChange={onSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="type">Type</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortCubes;