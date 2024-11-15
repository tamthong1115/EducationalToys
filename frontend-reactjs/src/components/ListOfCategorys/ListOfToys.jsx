import React, { useState } from 'react'
import picture1 from '../../assets/images/categorys/pic-1.jpg'
import picture2 from '../../assets/images/categorys/pic-2.jpg'
import picture3 from '../../assets/images/categorys/pic-3.jpg'
import picture4 from '../../assets/images/categorys/pic-4.jpg'
import picture5 from '../../assets/images/categorys/pic-5.jpg'
import picture6 from '../../assets/images/categorys/pic-6.jpg'
import picture7 from '../../assets/images/categorys/pic-7.jpg'
import picture8 from '../../assets/images/categorys/pic-8.jpg'
import picture9 from '../../assets/images/categorys/pic-9.jpg'
import picture10 from '../../assets/images/categorys/pic-10.jpg'
export const ListOfToys = () => {

  const [show, setShow] = useState(null);

  const toys = [
    {
      id: 1,
      images: picture1,
      persent: "83%",
      price1: "£58.99",
      price2: "£9.99",
      title: "Florest Game - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 2,
      images: picture2,
      persent: "62%",
      price1: "£25.99",
      price2: "£9.99",
      title: "Food Groups: Carbs and Grains - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 3,
      images: picture3,
      persent: "77%",
      price1: "£64.99",
      price2: "£14.99",
      title: "15 Large Emotions Photo Tiles - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 4,
      images: picture4,
      persent: "72%",
      price1: "£35.99",
      price2: "£9.99",
      title: "3 Sea Creatures Weaving Frames - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 5,
      images: picture5,
      persent: "76%",
      price1: "£40.99",
      price2: "£9.99",
      title: "Tall Sand Castle Buckets - Set of 8 - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 6,
      images: picture6,
      persent: "67%",
      price1: "£60.99",
      price2: "£19.99",
      title: "Animal Instant Learning Centre - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 7,
      images: picture7,
      persent: "67%",
      price1: "£29.99",
      price2: "£9.99",
      title: "Triangle Match Ups: Time - REDUCED TO CLEAR!",
      status: " In stock"
    },

    {
      id: 8,
      images: picture8,
      persent: "83%",
      price1: "£59.99",
      price2: "£9.99",
      title: "24 Assorted Foods - REDUCED TO CLEAR!",
      status: "Low stock"
    },

    {
      id: 9,
      images: picture9,
      persent: "59%",
      price1: "£48.99",
      price2: "£19.99",
      title: "Moods and Emotions - pack of 20 prints - REDUCED TO CLEAR!",
      status: "Low stock"
    },

    {
      id: 10,
      images: picture10,
      persent: "75%",
      price1: "£19.99",
      price2: "£4.99",
      title: "OCEAN JOURNALS (SET OF 10) - REDUCED TO CLEAR!s",
      status: "In stock"
    },
  ]
  return (
    <>
      <div className='mt-[60px]'>
        <div className='text-black font-[700] text-[24px] mb-[24px]'>
          REDUCED TO CLEAR - Limited Stock!
        </div>

        <div className='grid grid-cols-5 gap-[20px]'>
          {toys.map(item => (
            <div className='bg-[#FFFFFF] border-[3px] border-solid border-[#E6E6E6] rounded-[10px] p-[10px] cursor-pointer'
              key={item.id}
              onMouseEnter={() => setShow(item.id)}
              onMouseLeave={() => setShow(null)}
            >
              <div className=''>
                <img src={item.images} alt="" className='w-[100%] h-[100%] object-cover aspect-[193/129]' />
              </div>

              <div className="flex mt-[20px]">
                <span className='bg-[#F04F36] p-[5px] rounded-[5px] font-[700] text-[12px]'>
                  Save: {item.persent}
                </span>
              </div>

              <div className='mt-[10px]'>
                <div className='text-[#91A1A5] text-[12px] font-[700] line-through'>{item.price1}</div>
                <div className='text-[#f04f46] font-[700] text-[20px]'>{item.price2}</div>
              </div>

              <div className='text-[#4b5563] flex items-center font-[500] cursor-pointer'>
                {item.title}
              </div>

              <div className='text-[#64A969]'>
                {item.status}
              </div>
              {show === item.id && (
                <div className='items-center justify-center gap-[5px] mt-[20px] flex' id="showButton">
                  <div className='text-[#635C9D] border-[1px] border-solid border-[#CECECE] font-[500] py-[5px] px-[10px] text-[12px] cursor-pointer'>Quick Shop</div>
                  <div className='text-white font-[500] bg-[#635C9D] py-[5px] px-[20px] text-[12px] cursor-pointer'>Add to cart</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
