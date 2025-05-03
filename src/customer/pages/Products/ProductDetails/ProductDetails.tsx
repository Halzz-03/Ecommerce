import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { grey, teal } from '@mui/material/colors';
import { Box, Button, Chip, Divider, Grid, Modal, Rating, Typography, Paper, Card, CardContent } from '@mui/material';
import { Wallet, Shield, WorkspacePremium, LocalShipping, ShieldMoonSharp, FavoriteBorder, Favorite, AddShoppingCart } from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmilarProduct from '../SimilarProduct/SmilarProduct';
import ZoomableImage from './ZoomableImage';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
import ProductReviewCard from '../../Review/ProductReviewCard';
import RatingCard from '../../Review/RatingCard';
import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
import { isWishlisted } from '../../../../util/isWishlisted';
import { IconButton } from '@mui/material';
import { ShieldIcon, WalletIcon } from 'lucide-react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    height: "100%",
    boxShadow: 24,
    outline: "none",
};

const ProductDetails = () => {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { products, review, wishlist } = useAppSelector((store) => store);
    const { productId, categoryId } = useParams();

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(Number(productId)));
            dispatch(fetchReviewsByProductId({ productId: Number(productId) }));
        }
        dispatch(getAllProducts({ category: categoryId }));
    }, [productId, categoryId, dispatch]);

    const handleAddCart = () => {
        dispatch(addItemToCart({
            jwt: localStorage.getItem('jwt'),
            request: { productId: Number(productId), size: products.product?.sizes || '', quantity }
        }));
    };

    const handleAddWishlist = () => {
        setIsFavorite((prev) => !prev);
        if (products.product?.id) {
            dispatch(addProductToWishlist({ productId: products.product.id }));
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
                        {products.product?.images.map((item, index) => (
                            <img
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className='lg:w-full w-[50px] cursor-pointer rounded-md'
                                src={item}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className='w-full lg:w-[85%]'>
                        <img
                            onClick={handleOpen}
                            className='w-full rounded-md cursor-zoom-out'
                            src={products.product?.images[selectedImage]}
                            alt=""
                        />
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ZoomableImage src={products.product?.images[selectedImage]} alt="" />
                        </Box>
                    </Modal>
                </section>

                <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        height: '100%',
        ml: 3, // Add margin to separate from the left section
      }}
    >
      {/* Seller and Product Name */}
      <Box mb={2}>
        <Typography variant="h5" fontWeight="700" color="teal.900">
          {products.product?.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {products.product?.seller?.businessDetails.businessName}
        </Typography>
      </Box>

      {/* Rating Badge */}
      <Box 
        sx={{ 
          display: 'inline-flex',
          alignItems: 'center', 
          border: `1px solid ${grey[300]}`, 
          borderRadius: 1,
          px: 2,
          py: 0.5,
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          <Typography variant="body2" fontWeight="medium" mr={0.5}>4</Typography>
          <StarIcon sx={{ color: teal[600], fontSize: 16 }} />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {products.product?.numRatings} Ratings
        </Typography>
      </Box>

      {/* Price Section */}
      <Box mb={3}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h6" fontWeight="600" mr={1} color="text.primary">
            ₹{products.product?.sellingPrice}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ textDecoration: 'line-through', mr: 1 }}
          >
            ₹{products.product?.mrpPrice}
          </Typography>
          <Chip 
            label={`${products.product?.discountPercent}% off`} 
            size="small" 
            sx={{ 
              backgroundColor: teal[50], 
              color: teal[700],
              fontWeight: 600,
              borderRadius: 1
            }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Inclusive of all taxes. Free Shipping above ₹1500.
        </Typography>
      </Box>

      {/* Product Features */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 3, 
          borderColor: teal[100], 
          borderRadius: 2,
          backgroundColor: teal[50],
          p: 1
        }}
      >
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <ShieldIcon style={{ color: teal[700], marginRight: '1.5rem', fontSize: '20px' }} />
                <Typography variant="body2">Authentic & Quality Assured</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkspacePremium sx={{ color: teal[700], mr: 1.5, fontSize: 20 }} />
                <Typography variant="body2">100% money back guarantee</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <LocalShipping sx={{ color: teal[700], mr: 1.5, fontSize: 20 }} />
                <Typography variant="body2">Free Shipping & Returns</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WalletIcon style={{ color: teal[700], marginRight: '1.5rem', fontSize: '20px' }} />
                <Typography variant="body2">Pay on delivery available</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quantity Selector */}
      <Box mb={4}>
        <Typography variant="subtitle2" fontWeight="600" mb={1} color="text.secondary">
          QUANTITY
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: 120,
            border: `1px solid ${grey[300]}`,
            borderRadius: 1,
            px: 1
          }}
        >
          <IconButton 
            size="small" 
            disabled={quantity === 1} 
            onClick={() => setQuantity(quantity - 1)}
            sx={{ color: teal[700] }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography 
            variant="body1" 
            fontWeight="medium" 
            sx={{ flex: 1, textAlign: 'center' }}
          >
            {quantity}
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => setQuantity(quantity + 1)}
            sx={{ color: teal[700] }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleAddCart}
            startIcon={<AddShoppingCart />}
            sx={{ 
              backgroundColor: teal[700], 
              py: 1.5,
              '&:hover': {
                backgroundColor: teal[800],
              },
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Add To Bag
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleAddWishlist}
            startIcon={wishlist.wishlist && products.product && isWishlisted(wishlist.wishlist, products.product) 
              ? <Favorite sx={{ color: teal[500] }} /> 
              : <FavoriteBorder />}
            sx={{ 
              borderColor: teal[700], 
              color: teal[700],
              py: 1.5,
              '&:hover': {
                borderColor: teal[800],
                backgroundColor: teal[50],
              },
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {wishlist.wishlist && products.product && isWishlisted(wishlist.wishlist, products.product) 
              ? 'Remove from Wishlist' 
              : 'Add to Wishlist'}
          </Button>
        </Grid>
      </Grid>

      {/* Product Description */}
      <Box mb={5}>
        <Typography variant="subtitle1" fontWeight="600" mb={1} gutterBottom>
          Product Description
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {products.product?.description}
        </Typography>
      </Box>

      {/* Reviews & Ratings */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Reviews & Ratings
          </Typography>
          <Chip 
            label={`${review.reviews.length} Reviews`} 
            size="small" 
            sx={{ backgroundColor: teal[50], color: teal[700] }} 
          />
        </Box>
        
       {/* Rating Card would go here */}
<RatingCard totalReview={review.reviews.length} />

<Divider sx={{ my: 3 }} />

{/* Review List */}
<Box sx={{ mb: 3 }}>
  {review.reviews.slice(0, 2).map((item, i) => (
    <Box key={i} sx={{ mb: 2 }}>
      {/* <ProductReviewCard item={item} /> */}
      {/* Placeholder for ProductReviewCard */}
      <Box sx={{ p: 2, backgroundColor: grey[50], borderRadius: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={item.rating || 4} readOnly size="small" sx={{ color: teal[700] }} />
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
            {item.user.fullName || "Customer"}
          </Typography>
        </Box>
        <Typography variant="body2">{item.reviewText || "Great product!"}</Typography>
      </Box>
      {i < review.reviews.slice(0, 2).length - 1 && <Divider />}
    </Box>
  ))}
</Box>

{review.reviews.length > 0 && (
  <Button 
    onClick={() => navigate(`/reviews/${productId}`)}
    variant="outlined"
    sx={{ 
      color: teal[700], 
      borderColor: teal[700],
      '&:hover': {
        borderColor: teal[800],
        backgroundColor: teal[50],
      },
      borderRadius: 1,
      textTransform: 'none'
    }}
  >
    View all {review.reviews.length} Reviews
  </Button>
)}
 </Box>
    </Paper>
            </div>
        </div>
    );
};

export default ProductDetails;
