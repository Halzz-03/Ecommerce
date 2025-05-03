import React, { useState, useEffect, MouseEvent } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { teal } from "@mui/material/colors";
import { Box, Button, Modal, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/productTypes";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import { isWishlisted } from "../../../../util/isWishlisted";
import ChatBot from "../../ChatBot/ChatBot";

interface ProductCardProps {
    item: Product;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    borderRadius: ".5rem",
    boxShadow: 24,
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showChatBot, setShowChatBot] = useState(false);
    const { wishlist } = useAppSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddWishlist = (event: MouseEvent) => {
        event.stopPropagation();
        setIsFavorite((prev) => !prev);
        if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
    };

    const handleShowChatBot = (event: MouseEvent) => {
        event.stopPropagation();
        setShowChatBot(true);
    };

    const handleCloseChatBot = (e: MouseEvent) => {
        e.stopPropagation();
        setShowChatBot(false);
    };

    useEffect(() => {
        let interval: any;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
            }, 1500); // Changed to 1.5 seconds for better viewing
        }
        return () => clearInterval(interval);
    }, [isHovered, item.images.length]);

    return (
        <>
            <div
                onClick={() =>
                    navigate(
                        `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
                    )
                }
                className="group relative"
            >
                <div
                    className="relative w-full h-64 overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out bg-white hover:shadow-xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Discount badge */}
                    {/* {(item.discountPercent ?? 0) > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                            <Chip 
                                label={`${item.discountPercent}% OFF`} 
                                sx={{ 
                                    backgroundColor: teal[500],
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem'
                                }}
                                size="small"
                            />
                        </div>
                    )} */}

                    {/* Images container */}
                    <div className="relative w-full h-full">
                        {item.images.map((image: any, index: number) => (
                            <img
                                key={index}
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500"
                                src={image}
                                alt={`${item.title}-${index}`}
                                style={{
                                    transform: `translateX(${(index - currentImage) * 100}%)`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Hover overlay with actions */}
                    <div 
                        className={`absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-end p-4 transition-opacity duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Image indicators */}
                        <div className="flex justify-center gap-2 mb-4">
                            {item.images.map((_, index: number) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentImage 
                                            ? 'bg-teal-500 w-4' 
                                            : 'bg-white bg-opacity-60'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImage(index);
                                    }}
                                />
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex w-full justify-center gap-3 mb-2">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddWishlist}
                                sx={{
                                    backgroundColor: 'white',
                                    color: teal[500],
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        backgroundColor: teal[50],
                                    },
                                    minWidth: '36px',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '18px',
                                    padding: 0
                                }}
                            >
                                {wishlist.wishlist && isWishlisted(wishlist.wishlist, item) ? (
                                    <FavoriteIcon sx={{ color: teal[500], fontSize: '1.25rem' }} />
                                ) : (
                                    <FavoriteBorderIcon sx={{ color: teal[500], fontSize: '1.25rem' }} />
                                )}
                            </Button>

                            {/* <Button
                                variant="contained"
                                size="small"
                                onClick={handleShowChatBot}
                                sx={{
                                    backgroundColor: 'white',
                                    color: teal[500],
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        backgroundColor: teal[50],
                                    },
                                    minWidth: '36px',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '18px',
                                    padding: 0
                                }}
                            >
                                <ModeCommentIcon sx={{ color: teal[500], fontSize: '1.25rem' }} />
                            </Button> */}

                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: teal[500],
                                    color: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        backgroundColor: teal[600],
                                    },
                                    minWidth: '36px',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '18px',
                                    padding: 0
                                }}
                            >
                                <ShoppingCartIcon sx={{ fontSize: '1.25rem' }} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product details */}
                <div className="pt-3 px-2">
                    {/* Seller name */}
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            color: teal[700],
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}
                    >
                        {item.seller?.businessDetails.businessName}
                    </Typography>
                    
                    {/* Product title */}
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#333',
                            fontWeight: 500,
                            marginY: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {item.title}
                    </Typography>
                    
                    {/* Price information */}
                    <div className="flex items-center gap-2 mt-1">
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#1a1a1a',
                            }}
                        >
                            ₹{item.sellingPrice}
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                textDecoration: 'line-through',
                                color: '#888',
                            }}
                        >
                            ₹{item.mrpPrice}
                        </Typography>

                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: teal[500],
                                fontWeight: 600,
                            }}
                        >
                            {item.discountPercent}% off
                        </Typography>
                    </div>
                </div>
            </div>

            {/* ChatBot Modal */}
            {showChatBot && (
                <Modal
                    open={true}
                    onClose={handleCloseChatBot}
                    aria-labelledby="chat-modal"
                    aria-describedby="chat-with-product-assistant"
                >
                    <Box sx={style}>
                        <ChatBot handleClose={handleCloseChatBot} productId={item.id} />
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default ProductCard;