import React, { useState } from 'react';
import toydetailpage from '../../assets/images/Toyimg/toydetailpage.jpg';

const ToysDetailsPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = `The multi-award winning Bilibo is widely regarded as one of the most innovative and versatile open-ended toys. Deceptively simple and magically attractive, Bilibo's iconic shell shape and bright colours immediately appeal to children. Bilibo arouses curiosity, engages the imagination and playfully trains basic motor skills and balance. Both boys and girls find unlimited ways to play with Bilibo – using it to rock and spin in, hide under, sit on, tote with and peek through. Bilibo provides hours of fun, indoors and outdoors - all year round.`;

  const limitedDescription = isExpanded ? fullDescription : `${fullDescription.slice(0, 150)}...`;

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/2">
          <img alt="Blue Bilibo sensory toy" className="w-full" src={toydetailpage} />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-2xl font-bold mb-2 text-left">
            Bilibo - the Ultimate Sensory Toy
          </h1>
          <div className="flex items-center mb-4 text-left">
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              Save 17%
            </span>
            <span className="line-through text-gray-500 ml-2">£29.99</span>
            <span className="text-red-500 text-xl font-bold ml-2">£24.99</span>
          </div>
          <div className="text-gray-700 text-left">
            <p className="font-bold mb-2">Description</p>
            <p className="mb-2">
              {limitedDescription}
              <button
                className="text--400 underline "
                
                onClick={toggleDescription}
              >
                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
              </button>
            </p>
            <p className="font-bold mb-2">Age Range</p>
            <p className="mb-2">Recommended Ages: 2 years &amp; up</p>
            <p className="font-bold mb-2">Price</p>
            <p className="mb-2">£24.99</p>
            <p className="font-bold mb-2">Score</p>
            <div className="flex items-center mb-2">
              <span className="text-green-500">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-green-500">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-green-500">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-green-500">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-green-500">
                <i className="fas fa-star-half-alt"></i>
              </span>
            </div>
            <p className="font-bold mb-2">Weight</p>
            <p className="mb-2">0.5 kg</p>
            <p className="font-bold mb-2">Category</p>
            <p className="mb-2">Sensory Toys</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToysDetailsPage;
