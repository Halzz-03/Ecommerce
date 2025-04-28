import React, { useState, MouseEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { teal } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/productTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import CloseIcon from '@mui/icons-material/Close';
import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';

interface ProductCardProps {
  item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleIconClick = (e: MouseEvent) => {
    e.stopPropagation(); // prevent navigation when clicking CloseIcon
    setIsFavorite((prev) => !prev);
    if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
  };

  const handleCardClick = () => {
    if (item.category?.categoryId && item.title && item.id) {
      // Navigate to the dynamic product details page
      navigate(`/product-details/${item.category.categoryId}/${encodeURIComponent(item.title)}/${item.id}`);
    }
  };

  return (
    <div className="w-60 relative cursor-pointer" onClick={handleCardClick}>
      <div className="w-full">
        <img
          className="object-top w-full"
          src={item.images[0]}
          alt={`product-${item.title}`}
        />
      </div>

      <div className="pt-3 space-y-1 rounded-md">
        <div className="space-y">
          <p>{item.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">₹{item.sellingPrice}</span>
          <span className="text thin-line-through text-gray-400">₹{item.mrpPrice}</span>
          <span className="text-[#00927c] font-semibold">{item.discountPercent}% off</span>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <button onClick={handleIconClick}>
          <CloseIcon
            className="cursor-pointer bg-white rounded-full p-1"
            sx={{ color: teal[500], fontSize: '2rem' }}
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
