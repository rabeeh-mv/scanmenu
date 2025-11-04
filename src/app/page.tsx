import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Digital Menu Creator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create a digital menu for your offline shop
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/admin"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Shop Owner Login
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              View a sample menu
            </p>
            <Link 
              href="/menu/shop-123"
              className="mt-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Sample Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}