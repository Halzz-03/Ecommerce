import React from 'react';
import { Deal } from '../../../../types/dealTypes';
import { useNavigate } from 'react-router-dom';

const DealCard = ({ deal }: { deal: Deal }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/products/${deal.category.categoryId}`)} 
      className='w-full cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
    >
      <div className="relative">
        {/* Image with gradient overlay */}
        <img 
          className='w-full h-48 object-cover object-center transition-transform duration-500 hover:scale-110' 
          src={deal.category.image} 
          alt={deal.category.categoryId} 
        />
        
        {/* Pink accent border */}
        <div className="absolute inset-0 border-t-4 border-l-4 border-r-4 border-pink-500 rounded-t-lg pointer-events-none"></div>
        
        {/* Discount badge */}
        <div className="absolute -right-1 -top-1 bg-pink-600 text-white font-bold rounded-bl-lg rounded-tr-lg px-3 py-1 shadow-md transform rotate-3">
          {deal.discount}% OFF
        </div>
      </div>
      
      {/* Content section */}
      <div className='bg-gradient-to-r from-teal-800 to-teal-700 text-white p-4 text-center'>
        <h3 className='text-lg font-semibold mb-1 capitalize'>
          {deal.category.categoryId.split("_").join(" ")}
        </h3>
        
        <div className="my-2 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
        
        <div className="group">
          <p className='text-lg font-medium transition-colors duration-300 group-hover:text-pink-300'>
            SHOP NOW
          </p>
          <div className="w-0 h-0.5 bg-pink-300 mx-auto group-hover:w-full transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;