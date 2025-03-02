import React, { useState } from 'react';
import {
  ShoppingBag,
  DollarSign,
  Tag,
  Plus,
  Edit,
  Trash,
  Image,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  inventory: number;
  category: string;
  status: 'active' | 'draft' | 'sold-out';
}

const MerchandiseManagement = () => {
  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Classic Logo T-Shirt',
      price: '29.99',
      image:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Premium cotton t-shirt with our classic logo design.',
      inventory: 45,
      category: 'clothing',
      status: 'active',
    },
    {
      id: 2,
      name: 'Signed CD - "Celestial"',
      price: '19.99',
      image:
        'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description:
        'Limited edition signed copy of the "Celestial" album with exclusive booklet.',
      inventory: 12,
      category: 'music',
      status: 'active',
    },
    {
      id: 3,
      name: 'Tour Poster - 2023',
      price: '14.99',
      image:
        'https://images.unsplash.com/photo-1593810450967-f9c42742e326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'High-quality glossy print of the 2023 tour artwork.',
      inventory: 30,
      category: 'accessories',
      status: 'active',
    },
    {
      id: 4,
      name: 'Limited Edition Vinyl',
      price: '39.99',
      image:
        'https://images.unsplash.com/photo-1603733975097-b5db235254f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description:
        'Colored vinyl edition of the latest album with special packaging.',
      inventory: 0,
      category: 'music',
      status: 'sold-out',
    },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: '',
    image: '',
    description: '',
    inventory: 0,
    category: 'clothing',
    status: 'active',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: name === 'inventory' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id
            ? { ...productForm, id: currentProduct.id }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productForm,
        id: Math.max(0, ...products.map((p) => p.id)) + 1,
      };
      setProducts([...products, newProduct]);
    }

    // Reset form
    setShowForm(false);
    setCurrentProduct(null);
    setProductForm({
      name: '',
      price: '',
      image: '',
      description: '',
      inventory: 0,
      category: 'clothing',
      status: 'active',
    });
  };

  const editProduct = (product: Product) => {
    setCurrentProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      inventory: product.inventory,
      category: product.category,
      status: product.status,
    });
    setShowForm(true);
  };

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Filter products by status
  const activeProducts = products.filter(
    (product) => product.status === 'active'
  );
  const soldOutProducts = products.filter(
    (product) => product.status === 'sold-out'
  );
  const draftProducts = products.filter(
    (product) => product.status === 'draft'
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Merchandise</h2>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setShowForm(true);
          }}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">
            {currentProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price ($)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    placeholder="Price (e.g. 29.99)"
                    required
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                  placeholder="Image URL"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Image className="h-4 w-4" />
                </div>
              </div>
              {productForm.image && (
                <div className="mt-2 relative w-20 h-20">
                  <img
                    src={productForm.image}
                    alt="Product preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Product description"
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Inventory
                </label>
                <input
                  type="number"
                  name="inventory"
                  value={productForm.inventory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  >
                    <option value="clothing">Clothing</option>
                    <option value="music">Music</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Tag className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={productForm.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="sold-out">Sold Out</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {currentProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Products */}
      <div>
        <h3 className="text-xl font-bold mb-4">Active Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Inventory: {product.inventory}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="p-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {activeProducts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No active products.
          </p>
        )}
      </div>

      {/* Sold Out Products */}
      {soldOutProducts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Sold Out Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soldOutProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden opacity-70"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      SOLD OUT
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="p-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchandiseManagement;
