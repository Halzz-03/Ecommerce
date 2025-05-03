import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';
import { addItemToCart } from '../../../Redux Toolkit/Customer/CartSlice';
import { Product } from '../../../types/productTypes';
import { Heart, X, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity] = useState(1); // default to 1

  const handleRemoveClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
  };

  const handleAddToCartClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (item.id) {
      dispatch(addItemToCart({
        jwt: localStorage.getItem('jwt'),
        request: {
          productId: item.id,
          size: item.sizes || '', // default size
          quantity: quantity,
        },
      }));
    }
  };

  const handleCardClick = () => {
    if (item.category?.categoryId && item.title && item.id) {
      navigate(`/product-details/${item.category.categoryId}/${encodeURIComponent(item.title)}/${item.id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="h-64 overflow-hidden">
          <img
            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
            src={item.images[0]}
            alt={`${item.title}`}
          />
        </div>

        {/* Remove Button */}
        <button 
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-90 hover:opacity-100"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">{item.title}</h3>
        <p className="text-sm text-gray-500 truncate">{item.category?.name}</p>
        <div className="flex items-center mt-2 gap-2">
          <span className="font-bold text-gray-800">₹{item.sellingPrice}</span>
          <span className="text-sm line-through text-gray-400">₹{item.mrpPrice}</span>
          <span className="text-green-600 text-sm">{item.discountPercent}% off</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
