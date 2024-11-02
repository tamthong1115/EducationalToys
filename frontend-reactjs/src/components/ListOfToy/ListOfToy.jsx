import React from 'react'
import pic1 from '../../assets/images/ListToyTitle/pic-1.jpg'
import pic2 from '../../assets/images/ListToyTitle/pic-2.jpg'
import pic3 from '../../assets/images/ListToyTitle/pic-3.jpg'
import pic4 from '../../assets/images/ListToyTitle/pic-4.jpg'
import pic5 from '../../assets/images/ListToyTitle/pic-5.jpg'
import pic6 from '../../assets/images/ListToyTitle/pic-6.jpg'
import { ListItem } from './ListItem'
export const ListOfToy = () => {
  return (
    <>
        <div className='container mt-[60px]'>
            <div className='text-black text-[24px] font-[700] mb-[24px]'>
                Shop By Category
            </div>
            <div className='grid grid-cols-6 gap-[20px]'>
                    <ListItem
                        image = {pic1}
                        title = "Balance"
                    />
                    <ListItem
                        image = {pic2}
                        title = "Balance"
                    />

                    <ListItem
                        image = {pic3}
                        title = "Balance"
                    />

                    <ListItem
                        image = {pic4}
                        title = "Balance"
                    />

                    <ListItem
                        image = {pic5}
                        title = "Balance"
                    />

                    <ListItem
                        image = {pic6}
                        title = "Balance"
                    />

            </div>
        </div>
    </>
  )
}
