"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2, Store, MapPin, Phone, User, Search, Grid3x3, List, ShoppingBag, Menu, Bell, Settings, Package, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [shopName, setShopName] = useState("");
  const [place, setPlace] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeMenu, setActiveMenu] = useState("products");

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Burger", category: "Fast Food", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { id: "2", name: "Pizza", category: "Italian", price: 12.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
    { id: "3", name: "Pasta Carbonara", category: "Italian", price: 14.50, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop" },
    { id: "4", name: "Caesar Salad", category: "Salads", price: 9.99, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop" },
  ]);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveShopDetails = () => {
    console.log("Shop details saved:", { userId, shopName, place, contactNumber });
    alert("Shop details saved successfully!");
    setMobileSidebarOpen(false);
  };

  const handleAddProduct = () => {
    if (!productName || !category || !price) {
      alert("Please fill in all required fields");
      return;
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      category,
      price: parseFloat(price),
      image: productImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setCategory("");
    setPrice("");
    setProductImage("");
    setShowAddProduct(false);
    alert("Product added successfully!");
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: activeMenu === "dashboard" },
    { id: "products", label: "Products", icon: Package, active: activeMenu === "products" },
    { id: "shop", label: "Shop Details", icon: Store, active: activeMenu === "shop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Store className="text-white" size={20} />
              </div>
              <span className="font-bold text-lg text-gray-900">ScanMenu</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto">
              <Store className="text-white" size={20} />
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
                    {sidebarOpen && item.active && <ChevronRight size={16} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4">
          <Link href="/menu/shop-123">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <ShoppingBag size={20} />
              {sidebarOpen && <span className="flex-1 text-left">View Menu</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Store className="text-white" size={20} />
                </div>
                <span className="font-bold text-lg text-gray-900">ScanMenu</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="py-4">
              <ul className="space-y-1 px-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveMenu(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          item.active
                            ? 'bg-indigo-50 text-indigo-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.active && <ChevronRight size={16} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-gray-200 p-4">
              <Link href="/menu/shop-123">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <ShoppingBag size={20} />
                  <span className="flex-1 text-left">View Menu</span>
                </button>
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Manage your products and shop</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} className="text-gray-600" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={18} />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@scanmenu.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Shop Details Section - Shows when shop menu is active */}
          {activeMenu === "shop" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Shop Details</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your shop information</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={16} />
                      User ID
                    </label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter user ID"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Store size={16} />
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="Enter shop name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} />
                      Place
                    </label>
                    <input
                      type="text"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Enter contact number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveShopDetails}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                  >
                    Save Shop Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Section - Shows when products menu is active */}
          {activeMenu === "products" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Product Management</h2>
                  <div className="flex gap-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-600"} transition-all`}
                        title="Grid View"
                      >
                        <Grid3x3 size={16} className="sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-gray-600"} transition-all`}
                        title="List View"
                      >
                        <List size={16} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm"
                    >
                      <Plus size={16} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Add Product</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Product Name *"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Category *"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price *"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.01"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
                      <button
                        onClick={handleAddProduct}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        Add Product
                      </button>
                      <button
                        onClick={() => setShowAddProduct(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div className="p-4 sm:p-6">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-block p-3 sm:p-4 bg-gray-100 rounded-full mb-4">
                      <Store className="text-gray-400 mx-auto" size={32} />
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg">No products found</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your search or filter</p>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{product.name}</h3>
                            <span className="text-indigo-600 font-bold text-base sm:text-lg">₹{product.price.toFixed(2)}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{product.category}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => alert("Edit functionality would open a modal to edit this product")}
                              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-xs sm:text-sm font-medium"
                            >
                              <Edit2 size={14} className="sm:w-4 sm:h-4" />
                              <span className="hidden xs:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm font-medium"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                              <span className="hidden xs:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex items-center p-3 sm:p-4 gap-3 sm:gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-indigo-600 font-bold text-base sm:text-xl whitespace-nowrap">₹{product.price.toFixed(2)}</span>
                            <div className="flex gap-1 sm:gap-2">
                              <button
                                onClick={() => alert("Edit functionality would open a modal to edit this product")}
                                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={16} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dashboard Section - Shows when dashboard menu is active */}
          {activeMenu === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{products.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Package className="text-indigo-600" size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Categories</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{categories.length - 1}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Store className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Shop Status</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">Active</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveMenu("products")}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Plus className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Add New Product</p>
                        <p className="text-sm text-gray-500">Create a new product listing</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveMenu("shop")}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Store className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Update Shop Details</p>
                        <p className="text-sm text-gray-500">Edit your shop information</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}