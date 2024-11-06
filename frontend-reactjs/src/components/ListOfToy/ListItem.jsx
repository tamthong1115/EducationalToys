import React from 'react'

export const ListItem = (props) => {
    const { image, title } = props
    return (
        <>
            <div className='text-black'>
                <div className='mb-[10px]'>
                    <img src={image} alt="" className='aspect-square object-cover rounded-[20px] cursor-pointer'/>
                </div>
                <div className='text-[#1599ef] text-[18px] font-[700] cursor-pointer'>
                    {title}
                </div>
            </div>
        </>
    )
}
