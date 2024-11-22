import user from '../../assets/images/userImages/user.png'
import user2 from '../../assets/images/userImages/User2.png'
import cart from '../../assets/images/userImages/cart.png'
import notification from '../../assets/images/userImages/notify.png'
import { Link } from 'react-router-dom'
import React, { useState } from "react";

export const Profile = () => {

    const [myAccount, setMyAccount] = useState(false);

    const handleMyAccount = () => {
        if(myAccount === false){
            setMyAccount(true);
        }
        else {
            setMyAccount(false);
        }
    }
    return (
        <>
            <div className="pt-[20px] pb-[50px]">
                <div className="container flex">
                    {/* box-left */}
                    <div className="w-[20%] ml-[20px] text-black py-[15px] border-1px border-solid border-r">
                        <div className="flex mb-[35px]">
                            <img src={user} alt="User picture" className='rounded-full object-cover' />
                            <div className="ml-[10px]">
                                <div className="font-[700]">lmthnhduy400</div>
                                <div className="opacity-[0.6] font-[700]">Edit profile</div>
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={user2} alt="" className='w-[24px] mr-[5px]' />
                                    <a className='text-black font-[700] cursor-pointer'
                                        onMouseDown={handleMyAccount}
                                    >
                                        My Account
                                    </a>
                                </div>

                                {myAccount && (
                                    <div className='ml-[30px]'>
                                        <div className=''>
                                            <Link
                                                to='/user/profile'
                                                className='text-black'>
                                                Profile
                                            </Link>
                                        </div>

                                        <div>
                                            <Link className='text-black'>
                                                Bank
                                            </Link>
                                        </div>

                                        <div>
                                            <Link className='text-black'>
                                                Adress
                                            </Link>
                                        </div>

                                        <div className='mb-[10px]'>
                                            <Link className='text-black'>
                                                Change password
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={cart} alt="" className='w-[24px] mr-[5px]' />
                                    <Link
                                        to="user/order"
                                        className='text-black font-[700]'
                                    >
                                        Order
                                    </Link>
                                </div>
                            </div>

                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={notification} alt="" className='w-[24px] mr-[5px]' />
                                    <Link
                                        to="user/notification"
                                        className='text-black font-[700]'
                                    >
                                        Notification
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* box-right */}
                    <div className="text-black text-center w-[75%] mt-[100px] text-[24px] font-[700]">
                        
                    </div>
                </div>
            </div>
        </>
    )
}