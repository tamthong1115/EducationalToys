import user2 from '../../assets/images/userImages/User2.png'
import cart from '../../assets/images/userImages/cart.png'
import notification from '../../assets/images/userImages/notify.png'
import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import {getUserProfile, updateUserProfile} from '../../API/UserAPI.js'
import {useMutation, useQuery} from "@tanstack/react-query";
import LoadingComponent from "../Loading/LoadingComponent.jsx";
import {toast} from "react-hot-toast";

export const Profile = () => {


    const [myAccount, setMyAccount] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const {data: user, isLoading: userLoading, refetch} = useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
    })

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    }, [user]);


    const mutation = useMutation(
        {
            mutationKey: ['updateUserProfile'],
            mutationFn: updateUserProfile,
            onSuccess: async () => {
                toast.success('Profile updated successfully');
                setIsEditing(false);
                await refetch();
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to update profile');
            },
        });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        mutation.mutate(formData);
    };

    const handleMyAccount = () => {
        if (myAccount === false) {
            setMyAccount(true);
        } else {
            setMyAccount(false);
        }
    }

    if (userLoading) {
        return <LoadingComponent/>
    }
    return (
        <>
            <div className="pt-[20px] pb-[50px]">
                <div className="container flex">
                    {/* box-left */}
                    <div className="w-[20%] ml-[20px] text-black py-[15px] border-1px border-solid border-r">
                        <div className="flex mb-[35px]">
                            <img
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopzyIOvzGpKWnfUJltGYb7TBeebUXuJydZQ&s"}
                                alt="User picture" className='rounded-full object-cover max-w-6'/>
                            <div className="ml-[10px]">
                                <div className="font-[700]">{user.name}</div>
                                <div className="opacity-[0.6] font-[700]">Edit profile</div>
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={user2} alt="" className='w-[24px] mr-[5px]'/>
                                    <a className='text-black font-[700] cursor-pointer'
                                       onMouseDown={handleMyAccount}
                                    >
                                        My Account
                                    </a>
                                </div>

                                {/*{myAccount && (*/}
                                {/*    <div className='ml-[30px]'>*/}
                                {/*        <div className=''>*/}
                                {/*            <Link*/}
                                {/*                to='/user/profile'*/}
                                {/*                className='text-black'>*/}
                                {/*                Profile*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}

                                {/*        <div>*/}
                                {/*            <Link className='text-black'>*/}
                                {/*                Bank*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}

                                {/*        <div>*/}
                                {/*            <Link className='text-black'>*/}
                                {/*                Adress*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}

                                {/*        <div className='mb-[10px]'>*/}
                                {/*            <Link className='text-black'>*/}
                                {/*                Change password*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>

                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={cart} alt="" className='w-[24px] mr-[5px]'/>
                                    <Link
                                        to="/orders"
                                        className='text-black font-[700]'
                                    >
                                        Order
                                    </Link>
                                </div>
                            </div>

                            <div className=''>
                                <div className='flex items-center mb-[10px]'>
                                    <img src={notification} alt="" className='w-[24px] mr-[5px]'/>
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
                    <div className="text-black w-[75%] mt-[50px] p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">User Information</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="text-lg border rounded p-2"
                                />
                            ) : (
                                <p className="text-lg">{user.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="text-lg border rounded p-2"
                                />
                            ) : (
                                <p className="text-lg">{user.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="text-lg border rounded p-2"
                                />
                            ) : (
                                <p className="text-lg">{user.phone}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="text-lg border rounded p-2"
                                />
                            ) : (
                                <p className="text-lg">{user.address}</p>
                            )}
                        </div>
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}