import user from '../../assets/images/userImages/user.png';
import user2 from '../../assets/images/userImages/User2.png';
import cart from '../../assets/images/userImages/cart.png';
import notification from '../../assets/images/userImages/notify.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { getUserProfile } from '../../API/UserAPI';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../Loading/LoadingComponent';

export const UserPages = () => {
    const [myAccount, setMyAccount] = useState(false);

    const handleMyAccount = () => {
        setMyAccount((prev) => !prev);
    };

    const { data: userData, isLoading } = useQuery({
        queryKey: ['fetchUserData'],
        queryFn: getUserProfile,
    });

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <>
            <div className="pt-[20px] pb-[50px]">
                <div className="container flex">
                    {/* box-left */}
                    <div className="w-[20%] ml-[20px] text-black py-[15px] border-1px border-solid border-r">
                        <div className="flex mb-[35px]">
                            <img src={user} alt="User picture" className="rounded-full object-cover" />
                            <div className="ml-[10px]">
                                <div className="font-[700]">{userData?.username || 'Username'}</div>
                                <div className="opacity-[0.6] font-[700]">{userData?.email || 'Edit profile'}</div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-[10px]">
                                <img src={user2} alt="" className="w-[24px] mr-[5px]" />
                                <a className="text-black font-[700] cursor-pointer" onMouseDown={handleMyAccount}>
                                    My Account
                                </a>
                            </div>

                            {myAccount && (
                                <div className="ml-[30px]">
                                    <div>
                                        <Link to="/user/profile" className="text-black">
                                            Profile
                                        </Link>
                                    </div>

                                    <div>
                                        <Link className="text-black">
                                            Bank
                                        </Link>
                                    </div>

                                    <div>
                                        <Link className="text-black">
                                            Address
                                        </Link>
                                    </div>

                                    <div className="mb-[10px]">
                                        <Link className="text-black">
                                            Change password
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center mb-[10px]">
                            <img src={cart} alt="" className="w-[24px] mr-[5px]" />
                            <Link to="user/order" className="text-black font-[700]">
                                Order
                            </Link>
                        </div>

                        <div className="flex items-center mb-[10px]">
                            <img src={notification} alt="" className="w-[24px] mr-[5px]" />
                            <Link to="user/notification" className="text-black font-[700]">
                                Notification
                            </Link>
                        </div>
                    </div>
                    {/* box-right */}
                    <div className='text-black ml-[10px]'>
                        <div className='font-[700] text-[24px] mb-[10px]'>
                            User Information
                        </div>

                        <div className=''>
                            <div className='text-[18px] mb-[5px]'> <span className='font-[700]'>Name:</span> {userData?.name || 'User0134'}</div>
                            <div className='text-[18px] mb-[5px]'> <span className='font-[700]'>Email:</span> {userData?.email || 'user01234@gmail.com'}</div>
                            <div className='text-[18px] mb-[5px]'> <span className='font-[700]'>Address:</span> {userData?.address || '...................'}</div>
                            <div className='text-[18px] mb-[5px]'> <span className='font-[700]'>Phone:</span> {userData?.phone || '......................'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
