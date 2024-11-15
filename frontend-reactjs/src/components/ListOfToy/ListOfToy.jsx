import React from 'react'
import pic1 from '../../assets/images/ListToyTitle/pic-1.jpg'
import pic2 from '../../assets/images/ListToyTitle/pic-2.jpg'
import pic3 from '../../assets/images/ListToyTitle/pic-3.jpg'
import pic4 from '../../assets/images/ListToyTitle/pic-4.jpg'
import pic5 from '../../assets/images/ListToyTitle/pic-5.jpg'
import pic6 from '../../assets/images/ListToyTitle/pic-6.jpg'
import pic7 from '../../assets/images/ListToyTitle/pic-7.jpg'
import pic8 from '../../assets/images/ListToyTitle/pic-8.jpg'
import pic9 from '../../assets/images/ListToyTitle/pic-9.jpg'
import pic10 from '../../assets/images/ListToyTitle/pic-10.jpg'
import pic11 from '../../assets/images/ListToyTitle/pic-11.jpg'
import pic12 from '../../assets/images/ListToyTitle/pic-12.jpg'
import pic13 from '../../assets/images/ListToyTitle/pic-13.jpg'
import pic14 from '../../assets/images/ListToyTitle/pic-14.jpg'
import pic15 from '../../assets/images/ListToyTitle/pic-15.jpg'
import pic16 from '../../assets/images/ListToyTitle/pic-16.jpg'
import pic17 from '../../assets/images/ListToyTitle/pic-17.jpg'
import pic18 from '../../assets/images/ListToyTitle/pic-18.jpg'
import pic19 from '../../assets/images/ListToyTitle/pic-19.jpg'
import pic20 from '../../assets/images/ListToyTitle/pic-20.jpg'
import pic21 from '../../assets/images/ListToyTitle/pic-21.jpg'
import pic22 from '../../assets/images/ListToyTitle/pic-22.jpg'
import pic23 from '../../assets/images/ListToyTitle/pic-23.jpg'
import pic24 from '../../assets/images/ListToyTitle/pic-24.jpg'
import { ListItem } from './ListItem'
export const ListOfToy = () => {
    return (
        <>
            <div className="container mt-[60px]">
                <div className="text-black text-[24px] font-[700] mb-[24px]">
                    Shop By Category
                </div>
                <div className="grid grid-cols-6 gap-[20px]">
                    <ListItem image={pic1} title="Balance" />
                    <ListItem image={pic2} title="Behavioural" />

                    <ListItem image={pic3} title="Construction Toys" />

                    <ListItem image={pic4} title="Tuff Trays" />

                    <ListItem image={pic5} title="Music" />

                    <ListItem image={pic6} title="Sand and Water" />

                    <ListItem image={pic7} title="Dens" />

                    <ListItem image={pic8} title="Literacy and Language" />

                    <ListItem image={pic9} title="Maths" />

                    <ListItem image={pic10} title="Science and Technology" />

                    <ListItem image={pic11} title="Arts and Crafts" />

                    <ListItem image={pic12} title="Sports" />

                    <ListItem image={pic13} title="Playground" />

                    <ListItem image={pic14} title="Art Drying Racks" />

                    <ListItem image={pic15} title="Book Stands" />

                    <ListItem image={pic16} title="Storage Trolleys" />

                    <ListItem image={pic17} title="Welly Boot Racks" />

                    <ListItem image={pic18} title="Easels" />

                    <ListItem image={pic19} title="Furniture and accessories" />

                    <ListItem image={pic20} title="Games and Puzzles" />

                    <ListItem image={pic21} title="Outdoor" />

                    <ListItem image={pic22} title="Role Play" />

                    <ListItem image={pic23} title="Messy Play" />

                    <ListItem image={pic24} title="Toys" />
                </div>
            </div>
        </>
    )
}
