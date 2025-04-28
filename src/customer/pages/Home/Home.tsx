import React, { useEffect, useState } from 'react'
import Banner from './Banner/Banner'
import HomeCategory from './HomeCategory/HomeCategory'
import ElectronicCategory from './Electronic Category/ElectronicCategory'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Backdrop, Button, CircularProgress } from '@mui/material'
import ChatBot from '../ChatBot/ChatBot'
import { useNavigate } from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import DealSlider from './Deals/Deals';
import TopBrand from './TopBrands/GridHome';
import { fetchHomePageData } from '../../../Redux Toolkit/Customer/Customer/AsyncThunk';

const Home = () => {
    const [showChatBot, setShowChatBot] = useState(false)
    const { homePage } = useAppSelector(store => store)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

   // In Home.jsx, add these logs
   useEffect(() => {
    // Dispatch the action to fetch home page data
    dispatch(fetchHomePageData());

    // Log the state after the fetch
    setTimeout(() => {
      console.log("Fetched home page data:", homePage);
    //   console.log("Loading:");
    //   console.log("Error:", error);
    }, 2000); // Adjust timeout as needed
  }, [dispatch]);
  
 

    const handleShowChatBot = () => {
        setShowChatBot(!showChatBot)
    }
    const handleCloseChatBot = () => {
        setShowChatBot(false)
    }
    const becomeSellerClick = () => {
        navigate("/become-seller")
    }

    return (
        <>
            {(!homePage.loading) ? (
                <div className='space-y-5 lg:space-y-10 relative'>
                    {homePage.homePageData?.electricCategories && <ElectronicCategory />}
                    {/* <Banner /> */}

                    {homePage.homePageData?.grid && (
                        <section>
                            <h1 className='text-center text-lg lg:text-4xl font-bold text-[#00927c] pb-5 lg:pb-10'>Shop by Trends</h1>
                            <TopBrand />
                        </section>
                    )}

                    {homePage.homePageData?.deals && (
                        <section className='pt-10'>
                            {/* <h1 className='text-center text-lg lg:text-4xl font-bold text-[#00927c] pb-5 lg:pb-10'>Today's Deals</h1> */}
                            <DealSlider />
                        </section>
                    )}

                    {homePage.homePageData?.shopByCategories && (
                        <section className='flex flex-col justify-center items-center py-20 px-5 lg:px-20'>
                            <h1 className='text-lg lg:text-4xl font-bold text-[#00927c] pb-5 lg:pb-20'>SHOP BY CATEGORY</h1>
                            <HomeCategory />
                        </section>
                    )}

                    <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
                        <img className='w-full h-full' src={"/seller_banner_image.jpg"} alt="Become a seller" />
                        <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                            <h1>
                                Sell Your Product
                            </h1>
                            <p className='text-lg md:text-2xl'>With <strong className='logo text-3xl md:text-5xl pl-2'>Caritfy</strong></p>

                            <div className='pt-6 flex justify-center'>
                                <Button
                                    onClick={becomeSellerClick}
                                    startIcon={<StorefrontIcon />}
                                    variant="contained"
                                >
                                    Become Seller
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className='fixed bottom-10 right-10'>
                        {showChatBot ? (
                            <ChatBot handleClose={handleCloseChatBot} />
                        ) : (
                            <Button 
                                onClick={handleShowChatBot} 
                                sx={{ borderRadius: "2rem" }} 
                                variant='contained' 
                                className='h-16 w-16 flex justify-center items-center rounded-full'
                            >
                                <ChatBubbleIcon sx={{ color: "white", fontSize: "2rem" }} />
                            </Button>
                        )}
                    </section>
                </div>
            ) : (
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>
    )
}

export default Home