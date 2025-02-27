import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function FilterBar({ searchTerm, setSearchTerm }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-1">
      <div className="relative w-full md:w-auto max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full block w-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          placeholder="Search by artist, title or keyword..."
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex gap-2 ml-auto">
          <button className="bg-white border border-gray-300 rounded-full p-2.5 hover:bg-gray-100 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500/50">
            <option value="recent">Recently Added</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}
