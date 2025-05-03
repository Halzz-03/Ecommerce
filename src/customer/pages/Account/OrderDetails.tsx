import { 
  Box, 
  Button, 
  Divider, 
  Paper, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Grid, 
  Skeleton,
  CircularProgress 
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import OrderStepper from './OrderStepper';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { cancelOrder, fetchOrderById, fetchOrderItemById } from '../../../Redux Toolkit/Customer/OrderSlice';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const dispatch = useAppDispatch()
  const { cart, auth, orders } = useAppSelector(store => store);
  const { orderItemId, orderId } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchOrderItemById({
          orderItemId: Number(orderItemId),
          jwt: localStorage.getItem("jwt") || ""
        }));
        
        await dispatch(fetchOrderById({
          orderId: Number(orderId),
          jwt: localStorage.getItem("jwt") || ""
        }));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [auth.jwt, dispatch, orderItemId, orderId]);

  const handleCancelOrder = async () => {
    setCancelLoading(true);
    try {
      await dispatch(cancelOrder(orderId));
    } finally {
      setCancelLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant="rectangular" width={200} height={200} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={40} width="70%" />
            <Skeleton variant="text" height={30} width="50%" />
            <Skeleton variant="text" height={30} width="40%" />
            <Skeleton variant="rectangular" height={100} width="100%" sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!orders.orders || !orders.orderItem) {
    return (
      <Box 
        sx={{ 
          height: '80vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <ShoppingBagIcon sx={{ fontSize: 60, color: '#009688' }} />
        <Typography variant="h5" color="text.secondary">No order found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/account/orders')}
          sx={{ 
            bgcolor: '#009688', 
            '&:hover': { bgcolor: '#00796b' } 
          }}
        >
          Return to Orders
        </Button>
      </Box>
    );
  }

  const { product } = orders.orderItem;
  const { currentOrder } = orders;
  const isCancelled = currentOrder?.orderStatus === "CANCELLED";
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card 
              elevation={0} 
              sx={{ 
                maxWidth: 300, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                bgcolor: 'transparent'
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 180, height: 180, objectFit: 'contain' }}
                image={product.images[0]}
                alt={product.title}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="#009688">
                  {product.seller?.businessDetails.businessName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Size:</strong> M
                </Typography>
                
                <Button 
                  variant="contained" 
                  startIcon={<StarIcon />}
                  onClick={() => navigate(`/reviews/${product.id}/create`)}
                  sx={{ 
                    mt: 2, 
                    bgcolor: '#009688', 
                    '&:hover': { bgcolor: '#00796b' } 
                  }}
                >
                  Write Review
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order Status
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                mb: 3
              }}
            >
              <OrderStepper orderStatus={currentOrder?.orderStatus} />
              
              {isCancelled && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Chip 
                    label="Order Cancelled" 
                    color="error" 
                    variant="outlined" 
                    sx={{ fontSize: '1rem', py: 1 }}
                  />
                </Box>
              )}
            </Paper>
            
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Delivery Address
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                mb: 3,
                display: 'flex',
                gap: 2
              }}
            >
              <HomeIcon sx={{ color: '#009688' }} />
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {currentOrder?.shippingAddress.name}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="subtitle1">
                    {currentOrder?.shippingAddress.mobile}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {currentOrder?.shippingAddress.address}, {currentOrder?.shippingAddress.city}, {currentOrder?.shippingAddress.state} - {currentOrder?.shippingAddress.pinCode}
                </Typography>
              </Box>
            </Paper>
            
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Price Details
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  p: 3,
                  borderBottom: '1px dashed #e0e0e0'
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total Item Price
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You saved <span style={{ color: '#4caf50', fontWeight: 500 }}>
                      ₹{orders.orderItem?.mrpPrice - orders.orderItem?.sellingPrice}.00
                    </span> on this item
                  </Typography>
                </Box>
                
                <Typography variant="subtitle1" fontWeight="bold">
                  ₹{orders.orderItem?.sellingPrice}.00
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(0, 150, 136, 0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2 
                }}
              >
                <PaymentsIcon sx={{ color: '#009688' }} />
                <Typography variant="body2" fontWeight="medium">
                  Pay On Delivery
                </Typography>
              </Box>
              
              <Divider />
              
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">
                  <strong>Sold by:</strong> {product.seller?.businessDetails.businessName}
                </Typography>
              </Box>
              
              <Box sx={{ px: 3, pb: 3, pt: 1 }}>
                <Button
                  disabled={isCancelled || cancelLoading}
                  onClick={handleCancelOrder}
                  color="error"
                  variant="outlined"
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderColor: isCancelled ? '#e0e0e0' : '#f44336',
                    color: isCancelled ? '#9e9e9e' : '#f44336',
                    '&:hover': {
                      borderColor: isCancelled ? '#e0e0e0' : '#d32f2f',
                      bgcolor: 'rgba(244, 67, 54, 0.04)'
                    }
                  }}
                >
                  {cancelLoading ? (
                    <CircularProgress size={24} color="error" />
                  ) : (
                    isCancelled ? "Order Cancelled" : "Cancel Order"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default OrderDetails