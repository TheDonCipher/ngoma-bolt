import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Edit,
  Trash,
  ArrowUpDown,
  Tag,
  PackageOpen,
  Clock,
  DollarSign,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock merchandise data
const mockMerchandise = [
  {
    id: 1,
    name: 'African Rhythms T-Shirt',
    price: 0.05,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    inStock: 25,
    sold: 18,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Limited Edition Vinyl',
    price: 0.12,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1603048588665-711bd67905b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Music',
    inStock: 10,
    sold: 5,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Signed Poster',
    price: 0.03,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1559373098-b4e5455ed2e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Collectible',
    inStock: 15,
    sold: 12,
    status: 'Low Stock',
  },
  {
    id: 4,
    name: 'Concert Hoodie',
    price: 0.08,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    inStock: 30,
    sold: 7,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Digital Artwork',
    price: 0.15,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1633512423730-8aa5af312de8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Digital',
    inStock: 100,
    sold: 25,
    status: 'Active',
  },
  {
    id: 6,
    name: 'Tour Mug',
    price: 0.02,
    currency: 'ETH',
    image:
      'https://images.unsplash.com/photo-1577222512383-ed8bb23c0f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    inStock: 0,
    sold: 40,
    status: 'Sold Out',
  },
];

// Type definitions
type MerchandiseItem = {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  inStock: number;
  sold: number;
  status: string;
};

type FilterOptions = {
  category: string;
  status: string;
  sortBy: string;
};

const MerchandiseManagement = () => {
  const [merchandise, setMerchandise] =
    useState<MerchandiseItem[]>(mockMerchandise);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    status: 'All',
    sortBy: 'newest',
  });

  // Filter categories and statuses for dropdown
  const categories = [
    'All',
    ...Array.from(new Set(merchandise.map((item) => item.category))),
  ];
  const statuses = [
    'All',
    ...Array.from(new Set(merchandise.map((item) => item.status))),
  ];

  // Apply filters
  const filteredMerchandise = merchandise.filter((item) => {
    return (
      (filters.category === 'All' || item.category === filters.category) &&
      (filters.status === 'All' || item.status === filters.status)
    );
  });

  // Apply sorting
  const sortedMerchandise = [...filteredMerchandise].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'stock-asc':
        return a.inStock - b.inStock;
      case 'stock-desc':
        return b.inStock - a.inStock;
      case 'sales-asc':
        return a.sold - b.sold;
      case 'sales-desc':
        return b.sold - a.sold;
      default:
        return b.id - a.id; // newest first
    }
  });

  // Summary stats
  const totalItems = merchandise.length;
  const totalSold = merchandise.reduce((sum, item) => sum + item.sold, 0);
  const totalValue = merchandise.reduce(
    (sum, item) => sum + item.price * item.sold,
    0
  );
  const lowStockItems = merchandise.filter(
    (item) => item.status === 'Low Stock'
  ).length;

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Items
              </p>
              <h3 className="text-2xl font-bold">{totalItems}</h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
              <PackageOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Items Sold
              </p>
              <h3 className="text-2xl font-bold">{totalSold}</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold">
                {totalValue.toFixed(2)} ETH
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Low Stock Items
              </p>
              <h3 className="text-2xl font-bold">{lowStockItems}</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          <select
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="stock-asc">Stock: Low to High</option>
            <option value="stock-desc">Stock: High to Low</option>
            <option value="sales-asc">Sales: Low to High</option>
            <option value="sales-desc">Sales: High to Low</option>
          </select>
        </div>

        <Button
          onClick={() => setIsAddingItem(true)}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Merchandise
        </Button>
      </div>

      {/* Merchandise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMerchandise.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Item Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full 
                ${
                  item.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : item.status === 'Low Stock'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                }`}
              >
                {item.status}
              </div>
            </div>

            {/* Item Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1" /> {item.category}
                  </p>
                </div>
                <p className="font-bold text-lg">
                  {item.price} {item.currency}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>{item.inStock} in stock</p>
                <p>{item.sold} sold</p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {sortedMerchandise.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No merchandise found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Try adjusting your filters or add new merchandise items.
          </p>
          <Button
            onClick={() => setIsAddingItem(true)}
            className="mt-6 bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Merchandise
          </Button>
        </div>
      )}

      {/* Add Merchandise Item Modal would go here */}
    </div>
  );
};

export default MerchandiseManagement;
