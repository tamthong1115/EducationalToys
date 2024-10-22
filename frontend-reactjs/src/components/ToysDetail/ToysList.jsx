import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toy1 from "../../assets/images/Toyimg/Bilibo.jpg"
import toy2 from "../../assets/images/Toyimg/Bilibo1.jpg"
import toy3 from "../../assets/images/Toyimg/Led.jpg"
import toy4 from "../../assets/images/Toyimg/Led1.jpg"
import toy5 from "../../assets/images/Toyimg/Liquid.jpg"
import toy6 from "../../assets/images/Toyimg/Liquid1.jpg"
import toy7 from "../../assets/images/Toyimg/Oogi.jpg"
import toy8 from "../../assets/images/Toyimg/Oogi1.jpg"
import toy9 from "../../assets/images/Toyimg/Toycar.jpg"
import toy10 from "../../assets/images/Toyimg/Toycar1.jpg"



const ToysList = () => {
  const [hoveredToyId, setHoveredToyId] = useState(null);
  const toys = [
    {
      id: 1,
      name: 'Bilibo',
      description: 'Save 25%',
      age_range: '5+',
      price: 29.99,
      rental_price_day: 0.00,
      rental_price_week: 0.00,
      rental_price_two_weeks: 0.00,
      stock: 15,
      available_for_rent: false,
      available_for_sale: true,
      manufacturer: 'DEF Company',
      supplier_id: 2,
      weight: 0.6,
      material: 'Plastic',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      images_url: toy1,
      hover_image_url: toy2
    },
    {
      id: 2,
      name: 'LED Light Blanket',
      description: 'Save 20%',
      age_range: '3+',
      price: 79.99,
      rental_price_day: 0.00,
      rental_price_week: 0.00,
      rental_price_two_weeks: 0.00,
      stock: 10,
      available_for_rent: false,
      available_for_sale: true,
      manufacturer: 'XYZ Company',
      supplier_id: 3,
      weight: 1.2,
      material: 'Fabric',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      images_url: toy3,
      hover_image_url: toy4
    },
    {
      id: 3,
      name: 'Liquid Tile Squares',
      description: 'Save 25%',
      age_range: '3+',
      price: 39.99,
      rental_price_day: 0.00,
      rental_price_week: 0.00,
      rental_price_two_weeks: 0.00,
      stock: 5,
      available_for_rent: false,
      available_for_sale: true,
      manufacturer: 'ABC Company',
      supplier_id: 1,
      weight: 0.5,
      material: 'Plastic',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      images_url: toy5,
      hover_image_url: toy6
    },
    {
      id: 4,
      name: 'Oogi Man Glow In The Dark',
      description: 'Save 20%',
      age_range: '3+',
      price: 17.99,
      rental_price_day: 0.00,
      rental_price_week: 0.00,
      rental_price_two_weeks: 0.00,
      stock: 8,
      available_for_rent: false,
      available_for_sale: true,
      manufacturer: 'GHI Company',
      supplier_id: 4,
      weight: 0.3,
      material: 'Silicone',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      images_url: toy7,
      hover_image_url: toy8
    },
    {
      id: 5,
      name: 'Toy Car',
      description: 'Save 15%',
      age_range: '4+',
      price: 12.99,
      rental_price_day: 0.00,
      rental_price_week: 0.00,
      rental_price_two_weeks: 0.00,
      stock: 20,
      available_for_rent: false,
      available_for_sale: true,
      manufacturer: 'JKL Company',
      supplier_id: 5,
      weight: 0.4,
      material: 'Metal',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      images_url: toy9,
      hover_image_url: toy10
    },
  ];

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0"> 
        {toys.map((toy) => (
          <Link to={`/toydetail/${toy.id}`} key={toy.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-64 mb-0" 
            onMouseEnter={() => setHoveredToyId(toy.id)}
            onMouseLeave={() => setHoveredToyId(null)}
          >
            <img
              alt={`Image of ${toy.name}`}
              className="w-full h-40 object-cover"
              src={hoveredToyId === toy.id ? toy.hover_image_url : toy.images_url}
            />
            <div className="p-2">
              <div className="flex items-center mb-1">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {toy.description}
                </span>
              </div>
              <div className="text-gray-500 line-through text-sm mb-1">
                £{toy.price.toFixed(2)}
              </div>
              <div className="text-red-600 text-lg font-bold mb-1">
                £{(toy.price * (1 - parseFloat(toy.description.match(/\d+/)[0]) / 100)).toFixed(2)}
              </div>
              <div className="text-gray-700 text-sm mb-1">
                {toy.name}
              </div>
              <div className="text-gray-600 text-xs mb-1">
                Manufacturer: {toy.manufacturer} | Weight: {toy.weight} kg | Material: {toy.material}
              </div>
              <div className="text-green-600 text-xs mb-2">
                {toy.stock > 0 ? 'In stock' : 'Out of stock'}
              </div>
              {hoveredToyId === toy.id && (
                <div className="flex space-x-1">
                  <button className="flex-1 bg-white text-red-600 border border-red-600 rounded py-1 text-xs font-semibold"
                   onClick={(e) => {
                    e.preventDefault(); 
                  }}
                  >
                    Quick shop
                  </button>
                  <button className="flex-1 bg-red-600 text-white rounded py-1 text-xs font-semibold">
                    Buy now
                  </button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToysList;
