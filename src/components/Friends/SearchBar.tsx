import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchBarProps = {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
};

const SearchBar = ({ query, setQuery, onSearch }: SearchBarProps) => {
  return (
    <div className="flex gap-3 mb-1">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search for friends..."
      />
      <Button onClick={onSearch} className="cursor-pointer">Search</Button>
    </div>
  );
};

export default SearchBar;
