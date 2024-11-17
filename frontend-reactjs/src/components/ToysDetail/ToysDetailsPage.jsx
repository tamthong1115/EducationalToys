import {useEffect, useState} from 'react'
import { Button, Input } from 'antd'
import {useParams} from "react-router-dom";
import { getToyById } from '../../API/ToyAPI.js';

const ToysDetailsPage = () => {
    const {id} = useParams();
    const [isExpanded, setIsExpanded] = useState(false)
    const [toy, setToy] = useState(null);

    console.log(id)

    const toggleDescription = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        const fetchToy = async () => {
            try {
                const toyData = await getToyById(id);
                setToy(toyData);
            } catch (error) {
                console.error('Failed to fetch toy details:', error);
            }
        };

        fetchToy();
    }, [id]);

    if (!toy) {
        return <div>Loading...</div>;
    }

    const handleCheckout = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/create-checkout-session',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const { url } = await response.json()

            window.location.href = url
        } catch (error) {
            console.error('Lỗi khi tạo phiên thanh toán:', error)
        }
    }

    const descriptionLimit = 100;
    const isLongDescription = toy.description.length > descriptionLimit;


    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="w-1/2">
                    <img
                        alt="Blue Bilibo sensory toy"
                        className="w-full"
                        src={toy.imageUrls[0]}
                    />
                </div>
                <div className="w-1/2 pl-8">
                    <h1 className="text-2xl font-bold mb-2 text-left">
                        {toy.name}
                    </h1>
                    <div className="flex items-center mb-4 text-left">
                        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                            Save 17%
                        </span>
                        <span className="line-through text-gray-500 ml-2">
                            £{toy.price}
                        </span>
                        <span className="text-red-500 text-xl font-bold ml-2">
                            £{toy.price}
                        </span>
                    </div>
                    <div className="text-gray-700 text-left">
                        <p className="font-bold mb-2">Description</p>
                        <p className="mb-2">
                            {isExpanded || !isLongDescription
                                ? toy.description
                                : `${toy.description.substring(0, descriptionLimit)}...`}
                            {isLongDescription && (
                                <button
                                    className="text-blue-400 underline ml-2"
                                    onClick={toggleDescription}
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </p>
                        <p className="font-bold mb-2">Age Range</p>
                        <p className="mb-2">
                            {toy.age_range}
                        </p>
                        <p className="font-bold mb-2">Price</p>
                        <p className="mb-2">£{toy.price}</p>
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
                        <p className="mb-2">{toy.weight} kg</p>
                        <p className="font-bold mb-2">Category</p>
                        <ul className="mb-2">
                            {toy.categoryNames.map((category, index) => (
                                <li key={index} className="list-disc list-inside">
                                {category}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4">
                            <span className="font-semibold">Quantity:</span>{' '}
                            <Input
                                className="w-20 h-10"
                                type="number"
                                defaultValue={1}
                                min={1}
                            />
                            <div className="mb-4 mt-4">
                                Please fill in your card number and make payment
                            </div>{' '}
                      
                            <Button className="mt-4" onClick={handleCheckout}>
                                check out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToysDetailsPage
