'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  ShoppingBag,
  Tag,
  DollarSign,
  MoreHorizontal,
  Package,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample merchandise data
const merchandiseItems = [
  {
    id: '1',
    name: 'Limited Edition T-Shirt',
    price: 29.99,
    inventory: 45,
    sold: 55,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
    status: 'active',
    category: 'apparel',
  },
  {
    id: '2',
    name: 'Album Vinyl',
    price: 24.99,
    inventory: 30,
    sold: 70,
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=60',
    status: 'active',
    category: 'music',
  },
  {
    id: '3',
    name: 'Logo Hoodie',
    price: 49.99,
    inventory: 25,
    sold: 25,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60',
    status: 'active',
    category: 'apparel',
  },
  {
    id: '4',
    name: 'Signature World Tour Poster',
    price: 19.99,
    inventory: 0,
    sold: 100,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60',
    status: 'sold_out',
    category: 'accessories',
  },
  {
    id: '5',
    name: 'Digital Album',
    price: 9.99,
    inventory: 999,
    sold: 250,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60',
    status: 'active',
    category: 'digital',
  },
  {
    id: '6',
    name: 'Baseball Cap',
    price: 22.99,
    inventory: 15,
    sold: 35,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60',
    status: 'active',
    category: 'apparel',
  },
];

export default function MerchandisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter merchandise based on search and active tab
  const filteredMerchandise = merchandiseItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'sold_out')
      return matchesSearch && item.status === 'sold_out';
    return matchesSearch && item.category === activeTab;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Merchandise</h1>
        <Button asChild>
          <Link href="/dashboard/artist/merchandise/create">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" /> Inventory
          </Button>
          <Button variant="outline">
            <DollarSign className="mr-2 h-4 w-4" /> Sales
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="apparel">Apparel</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="digital">Digital</TabsTrigger>
          <TabsTrigger value="sold_out">Sold Out</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredMerchandise.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMerchandise.map((item) => (
                <MerchandiseCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Products Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery
                  ? 'No products match your search criteria.'
                  : "You haven't added any products in this category yet."}
              </p>
              <Button asChild>
                <Link href="/dashboard/artist/merchandise/create">
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Update the interface to match the actual data structure
interface MerchandiseItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // Changed from 'image' to 'imageUrl'
  inventory: number; // Changed from 'stock' to 'inventory'
  sold: number;
  category: string;
  status: string; // Added 'status' property
  description?: string;
  isPublished?: boolean;
}

function MerchandiseCard({ item }: { item: MerchandiseItem }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={item.imageUrl || 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop&q=60'}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {item.status === 'sold_out' && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Sold Out
          </div>
        )}
        {item.inventory < 10 && item.inventory > 0 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <div className="flex items-center mt-1">
              <Tag className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </div>
          </div>
          <div className="text-lg font-medium">${item.price.toFixed(2)}</div>
        </div>

        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Inventory:</span>
            <span>{item.inventory}</span>
          </div>
          <div className="flex justify-between">
            <span>Sold:</span>
            <span>{item.sold}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Product</span>
            </DropdownMenuItem>
            {item.status === 'sold_out' ? (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Restock</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Mark as Sold Out</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
