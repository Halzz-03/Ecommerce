import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { getWishlistByUserId } from '../../../Redux Toolkit/Customer/WishlistSlice';
import WishlistProductCard from './WishlistProductCard';
import { HeartOff } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector(store => store);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {wishlist.wishlist?.products.length ? (
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-teal-200 pb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                My Wishlist
                <span className="ml-3 text-teal-600 bg-teal-100 text-sm px-3 py-1 rounded-full">
                  {wishlist.wishlist.products.length} items
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.wishlist?.products?.map((item, index) => (
                <WishlistProductCard key={item.id || index} item={item} />
              ))}
            </div>
          </section>
        ) : (
          <div className="h-96 flex justify-center items-center flex-col">
            <div className="bg-white p-12 rounded-xl shadow-lg text-center max-w-md">
              <div className="flex justify-center mb-6">
                <div className="bg-teal-100 p-4 rounded-full">
                  <HeartOff className="w-12 h-12 text-teal-600" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Your wishlist is empty
              </h1>
              <p className="text-gray-500 mb-6">
                Save items you love by clicking the heart icon for easy access later
              </p>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                onClick={() => window.history.back()}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;