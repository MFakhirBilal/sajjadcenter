'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminGuard from '../../../components/admin/AdminGuard';
import { useProducts } from '../../../context/ProductContext';
import { formatPrice } from '../../../data/currencies';
import { Plus, Edit, Trash2, Search, Barcode, Upload, Image as ImageIcon, CheckCircle, RefreshCw, X } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, addProduct, deleteProduct, resetToDefaultProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Women',
    price: 4500,
    salePrice: 0,
    stock: 25,
    imageUrl: '',
    sku: `SCH-WM-${Math.floor(1000 + Math.random() * 9000)}`,
    barcode: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    fabric: 'Luxury Lawn 3-Piece Unstitched',
    description: 'Exclusive Premium Collection from SajjadCenter.'
  });

  // Direct Device File Image Upload State
  const [uploadedBase64, setUploadedBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Handle direct file selection from device (computer / phone gallery)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setUploadedBase64(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const finalImage = uploadedBase64 || newProduct.imageUrl || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800';

    addProduct({
      ...newProduct,
      images: [finalImage]
    });

    setShowAddModal(false);
    // Reset Form
    setNewProduct({
      name: '',
      category: 'Women',
      price: 4500,
      salePrice: 0,
      stock: 25,
      imageUrl: '',
      sku: `SCH-WM-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      fabric: 'Luxury Lawn 3-Piece Unstitched',
      description: 'Exclusive Premium Collection from SajjadCenter.'
    });
    setUploadedBase64('');
    setImagePreview('');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this suit from inventory? It will also be removed from the customer website.')) {
      deleteProduct(id);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar />

        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Product & Stock Inventory ({products.length})
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Every suit added here immediately updates on the live customer website.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetToDefaultProducts}
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-gray-200 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                title="Reset to default sample catalog"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-amber-500/40 transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Suit / Garment</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md flex items-center bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
            <Search className="w-4 h-4 text-amber-500 ml-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by suit title, SKU, or category..."
              className="w-full bg-transparent p-2 focus:outline-none text-slate-800 dark:text-white"
            />
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-amber-400 font-serif uppercase tracking-wider">
                  <th className="p-3">Product / Image</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">SKU / Barcode</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-center">Stock Level</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-gray-200">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 flex items-center gap-3 font-bold">
                      <img
                        src={item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'}
                        alt={item.name}
                        className="w-10 h-12 object-cover rounded-lg shrink-0 border shadow-2xs"
                      />
                      <span className="truncate max-w-[200px]">{item.name}</span>
                    </td>
                    <td className="p-3 font-semibold text-amber-700 dark:text-amber-400">{item.category}</td>
                    <td className="p-3 font-mono text-[11px]">
                      <div className="font-bold text-slate-900 dark:text-white">{item.sku}</div>
                      <div className="text-slate-400 text-[10px] flex items-center gap-1">
                        <Barcode className="w-3 h-3" /> {item.barcode}
                      </div>
                    </td>
                    <td className="p-3 font-extrabold text-slate-950 dark:text-amber-400">
                      {formatPrice(item.salePrice && item.salePrice > 0 ? item.salePrice : item.price)}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        item.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {item.stock} Units
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Form Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
              <form
                onSubmit={handleCreateProduct}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-4 text-xs shadow-2xl border border-slate-200 dark:border-slate-800 my-8"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white">
                    Add New Suit / Product to Catalog
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Suit / Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Sajjad Royal Unstitched Lawn Suit 3-Piece"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none font-bold text-slate-900 dark:text-white"
                    >
                      <option value="Women">Women Collection</option>
                      <option value="Men">Men Collection</option>
                      <option value="Kids">Kids Collection</option>
                      <option value="Unstitched">Unstitched Lawn</option>
                      <option value="Ready to Wear">Ready to Wear</option>
                      <option value="Accessories">Accessories & Shawls</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Fabric Details</label>
                    <input
                      type="text"
                      value={newProduct.fabric}
                      onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                      placeholder="e.g. Luxury Printed Lawn 3-Piece"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Original Price (PKR)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Discount Sale Price (PKR)</label>
                    <input
                      type="number"
                      value={newProduct.salePrice}
                      onChange={(e) => setNewProduct({ ...newProduct, salePrice: Number(e.target.value) })}
                      placeholder="0 if no discount"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl focus:outline-none text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                </div>

                {/* Direct Device File Image Upload */}
                <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-dashed border-amber-500/40">
                  <label className="block font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-500" />
                    <span>Upload Suit Photo Directly From Device (Computer / Mobile)</span>
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-slate-900 file:text-amber-400 hover:file:bg-slate-800 cursor-pointer"
                  />

                  {/* Image Preview Box */}
                  {imagePreview ? (
                    <div className="mt-3 flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border">
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        className="w-16 h-20 object-cover rounded-lg border shadow-xs"
                      />
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Ready to upload!
                        </p>
                        <p className="text-slate-400 text-[10px] mt-0.5">Image loaded from your device gallery.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedBase64('');
                          setImagePreview('');
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 pt-1">
                      Or optionally paste an Image URL link below:
                    </div>
                  )}

                  {!imagePreview && (
                    <input
                      type="text"
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl focus:outline-none text-[11px] font-mono"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">SKU Code</label>
                    <input
                      type="text"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-gray-300">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-black rounded-xl shadow-lg border border-amber-500/40"
                  >
                    Save & Publish Suit
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
