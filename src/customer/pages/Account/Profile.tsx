import { Alert, Divider, Snackbar, Typography, Paper, Container, Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Order from './Order'
import UserDetails from './UserDetails'
import SavedCards from './SavedCards'
import OrderDetails from './OrderDetails'
import Addresses from './Adresses'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';


const menu = [
    { name: "Orders", path: "/account/orders", icon: <ShoppingBagIcon /> },
    { name: "Profile", path: "/account/profile", icon: <AccountCircleIcon /> },
    { name: "Saved Cards", path: "/account/saved-card", icon: <CreditCardIcon /> },
    { name: "Addresses", path: "/account/addresses", icon: <HomeIcon /> },
    { name: "Logout", path: "/", icon: <LogoutIcon /> }
]

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch()
    const { user, orders } = useAppSelector(store => store)
    const [snackbarOpen, setOpenSnackbar] = useState(false);
    
    const handleLogout = () => {
        dispatch(performLogout())
        navigate("/")
    }
    
    const handleClick = (item:any) => {
        if (item.name === "Logout") {
            handleLogout()
        }
        else navigate(`${item.path}`)
    }
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    useEffect(() => {
        if (user.profileUpdated || orders.orderCanceled || user.error) {
            setOpenSnackbar(true);
        }
    }, [user.profileUpdated, orders.orderCanceled]);
    
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: '#f5f5f5', mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <AccountCircleIcon sx={{ fontSize: 42, color: '#009688' }} />
                    <Typography variant="h5" fontWeight="bold" color="#333">
                        {user.user?.fullName || 'Welcome Back!'}
                    </Typography>
                </Box>
            </Paper>
            
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        {menu.map((item, index) => (
                            <Box 
                                key={item.name}
                                onClick={() => handleClick(item)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderBottom: index !== menu.length - 1 ? '1px solid #e0e0e0' : 'none',
                                    bgcolor: item.path === location.pathname ? '#009688' : 'white',
                                    color: item.path === location.pathname ? 'white' : '#333',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: '#00796b',
                                        color: 'white'
                                    }
                                }}
                            >
                                {item.icon}
                                <Typography fontWeight={item.path === location.pathname ? 'bold' : 'normal'}>
                                    {item.name}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={9}>
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            p: 3, 
                            borderRadius: 2,
                            minHeight: '70vh'
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<UserDetails />} />
                            <Route path='/orders' element={<Order />} />
                            <Route path='/orders/:orderId/:orderItemId' element={<OrderDetails />} />
                            <Route path='/profile' element={<UserDetails />} />
                            <Route path='/saved-card' element={<SavedCards />} />
                            <Route path='/addresses' element={<Addresses />} />
                        </Routes>
                    </Paper>
                </Grid>
            </Grid>
            
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={user.error ? "error" : "success"}
                    variant="filled"
                    sx={{ 
                        width: "100%",
                        bgcolor: user.error ? "#f44336" : "#009688"
                    }}
                >
                    {user.error ? user.error : orders.orderCanceled ? "Order canceled successfully" : "Profile updated successfully"}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Profile