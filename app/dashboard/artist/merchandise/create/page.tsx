'use client';

import { useState, ReactEventHandler } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CreateMerchandiseForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // ... other state variables for variations, inventory, etc.


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // ... logic to create new merchandise item
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields for name, description, price, image, etc. */}
    </form>
  );
};

import {
  ArrowLeft,
  Image,
  Plus,
  Trash2,
  Save,
  DollarSign,
  ShoppingBag,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateMerchandisePage() {
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [digitalProduct, setDigitalProduct] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In a real implementation, we would handle file uploads here
    // For this demo, we'll just simulate adding image URLs
    setImages((prev) => [...prev, '/placeholder.jpg']);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

return (
  <>
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard/artist/merchandise">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Merchandise
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Product Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div>
                <Label>Product Images</Label>
                <div
                  className={`mt-1 border-2 ${
                    dragOver
                      ? 'border-primary border-dashed bg-primary/10'
                      : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg p-4 h-48 flex flex-col items-center justify-center cursor-pointer transition-all`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById('product-images')?.click()
                  }
                >
                  <input
                    id="product-images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                  <Image className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="font-medium text-center">
                    Drag &amp; drop product images
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    or click to browse
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-5 w-5 absolute -top-2 -right-2 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <div
                        className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          document.getElementById('product-images')?.click()
                        }
                      >
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="digital-product"
                  checked={digitalProduct}
                  onCheckedChange={setDigitalProduct}
                />
                <Label htmlFor="digital-product">Digital Product</Label>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name *</Label>
                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="product-description">Description *</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-category">Category *</Label>
                  <Select>
                    <SelectTrigger id="product-category" className="mt-1" />
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="product-price">Price *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="Enter price"
                      className="pl-10"
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
