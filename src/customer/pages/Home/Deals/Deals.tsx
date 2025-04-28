import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { Deal } from "../../../../types/dealTypes";

export default function DealSlider() {
    const { homePage } = useAppSelector(store => store);
    
    // Keeping the same settings but modifying for smoother animations
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024, // Large screen
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // Mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        // Custom styling for dots and arrows
        dotsClass: "slick-dots custom-dots",
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="py-8 lg:px-20 bg-gradient-to-r from-teal-50 to-pink-50">
            <h2 className="text-3xl font-bold text-center mb-6 text-teal-700">
                <span className="relative inline-block">
                    Today's Hot Deals
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-full"></span>
                </span>
            </h2>
            <div className="slide-container px-4">
                <Slider {...settings}>
                    {homePage.homePageData?.deals?.map((item: Deal) => (
                        <div className="px-2 py-3 transition-transform duration-300 hover:scale-105">
                            <DealCard deal={item} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

// Custom arrow components
const NextArrow = (props:any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-10`}
            style={{ ...style, display: "block", background: "rgba(0, 150, 136, 0.7)", borderRadius: "50%", width: "40px", height: "40px", right: "-10px" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props:any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-10`}
            style={{ ...style, display: "block", background: "rgba(236, 72, 153, 0.7)", borderRadius: "50%", width: "40px", height: "40px", left: "-10px" }}
            onClick={onClick}
        />
    );
};