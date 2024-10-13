import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBoxOpen, faCommentDots, faStar } from '@fortawesome/free-solid-svg-icons'; // Import all needed icons
import bannerImage from "../../../src/assets/images/banner.png"; 

const Banner = () => {
  return (
    <div className="relative flex flex-col justify-center items-center py-20 bg-[#F8F8F8] z-0"> {/* Set z-index of banner */}
      <img
        src={bannerImage} 
        alt="Banner"
        style={{ width: "100%", height: "auto" }} 
        className="object-cover" 
      />
      
      {/* Container for the four items, spaced evenly */}
      <div className="flex justify-between items-center w-full max-w-6xl px-10 mt-10">
        {/* Free Delivery Section */}
        <div className="text-center flex flex-col items-center space-y-2">
          <FontAwesomeIcon icon={faTruck} className="text-4xl text-[#5A5A5A] mb-2" />
          <div>
            <p className="font-bold text-[#4D4D4D] text-lg" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Free Delivery
            </p>
            <p className="text-sm text-[#4D4D4D]" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              when you spend £25
            </p>
          </div>
        </div>

        {/* In Stock Section */}
        <div className="text-center flex flex-col items-center space-y-2">
          <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-[#5A5A5A] mb-2" />
          <div>
            <p className="font-bold text-[#4D4D4D] text-lg" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              In Stock
            </p>
            <p className="text-sm text-[#4D4D4D]" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              We only sell in stock products
            </p>
          </div>
        </div>

        {/* Queries Answered Section */}
        <div className="text-center flex flex-col items-center space-y-2">
          <FontAwesomeIcon icon={faCommentDots} className="text-4xl text-[#5A5A5A] mb-2" />
          <div>
            <p className="font-bold text-[#4D4D4D] text-lg" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Queries Answered
            </p>
            <p className="text-sm text-[#4D4D4D]" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              within 1 working day
            </p>
          </div>
        </div>

        {/* Quality Tested Section */}
        <div className="text-center flex flex-col items-center space-y-2">
          <FontAwesomeIcon icon={faStar} className="text-4xl text-[#5A5A5A] mb-2" />
          <div>
            <p className="font-bold text-[#4D4D4D] text-lg" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              Quality Tested
            </p>
            <p className="text-sm text-[#4D4D4D]" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              for school and home use
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
