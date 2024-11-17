import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addCart} from '../../redux/cartSlice'
import {useAuth} from "../../context/AuthContext.jsx";
import {Modal, Button} from 'antd'
import {createCartItem} from "../../API/CartAPI.js";
import {getAllToys} from "../../API/ToyAPI.js";
import {toast} from "react-hot-toast";

function ProductList() {
    const dispatch = useDispatch()
    const [hoveredToyId, setHoveredToyId] = useState(null)
    const initProduct = [
        {
            id: 9,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/hurzuxhbionuin6yiz13?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/ffppotsix28pvruacedm?_a=E',
            ],
            name: 'Test',
            description: 'tesst',
            age_range: 'middle',
            price: 3.0,
            stock: 5,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'test',
            weight: 3.0,
            material: 'irom',
            supplierId: 2,
        },
        {
            id: 10,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/tvbncitvj9enoykgg6ie?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/n5kcxifp9c9ubptggmvf?_a=E',
            ],
            name: 'Test',
            description: 'tesst',
            age_range: 'middle',
            price: 3.0,
            stock: 5,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'test',
            weight: 3.0,
            material: 'irom',
            supplierId: 2,
        },
        {
            id: 11,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/pfavetw2rllejai8lthy?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/yknnhzpfg39o4xbnlzcn?_a=E',
            ],
            name: 'Test',
            description: 'tesst',
            age_range: 'middle',
            price: 3.0,
            stock: 5,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'test',
            weight: 3.0,
            material: 'irom',
            supplierId: 2,
        },
        {
            id: 4,
            categoryNames: [],
            imageUrls: [],
            name: 'Test',
            description: 'test',
            age_range: 'middle',
            price: 3.0,
            stock: 5,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'test',
            weight: 3.0,
            material: 'iron',
            supplierId: 2,
        },
        {
            id: 5,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/etw1xmupmyqrmuklr9af?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/jlmr6ysvpezgl2wozax9?_a=E',
            ],
            name: 'Toyscar',
            description:
                'A small toy car for children, great for play and collection.',
            age_range: 'middle',
            price: 10.0,
            stock: 5,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'Toy Maker',
            weight: 3.0,
            material: 'Plastic',
            supplierId: 2,
        },
        {
            id: 6,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/qnvo77vmaybbooanod53?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/kzsa6f7ndksnthztbhnd?_a=E',
            ],
            name: 'Oggi',
            description:
                'Oogi is a tactile fidget toy with suction cups on its head, hands, and feet, and stretchy arms, sticking to smooth surfaces for playful fun.',
            age_range: 'middle',
            price: 24.99,
            stock: 10,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'Fun Toys Inc',
            weight: 0.5,
            material: 'Plastic,Silicon',
            supplierId: 2,
        },
        {
            id: 7,
            categoryNames: ['Educational Toys', 'STEM Toys'],
            imageUrls: [
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/w8vaeg1r1mxcauapsge1?_a=E',
                'https://res.cloudinary.com/dj5ra3hoe/image/upload/v1/EducationsToys/toys/gl0dz2toi9zwcc8sakn8?_a=E',
            ],
            name: 'Liqiuid',
            description:
                'Liquid is a tactile fidget toy with suction cups on its head, hands, and feet, and stretchy arms, sticking to smooth surfaces for playful fun.',
            age_range: 'middle',
            price: 25.99,
            stock: 10,
            available_for_rent: true,
            available_for_sale: true,
            manufacturer: 'Toys Inc',
            weight: 0.3,
            material: 'Plastic,Silicon',
            supplierId: 2,
        },
    ]
    const [products, setProducts] = useState(initProduct)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const {isAuthenticated} = useAuth();

    useEffect(() => {
        getAllToys().then((data) => {
            setProducts(data)
        })
    }, [])

    console.log(products)

    const handleAddToCart = async (product) => {
        if (isAuthenticated) {
            try {
                const quantity = 1
                await createCartItem(product.id, quantity);
                dispatch(addCart({id: product.id, quantity}))
                toast.success('Item added to cart');
            } catch (error) {
                toast.error(error.message || 'Failed to add item to cart')
            }

        } else {
            setIsModalVisible(true)
        }
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    console.log(products)

    return (
        <div className="container mt-[60px]">
            <div className="text-black text-[24px] font-[700] mb-[24px]">
                Product List
            </div>
            <div className="grid grid-cols-4 gap-[20px]">
                {products.map((product) => (
                    <Link
                        to={`/toydetail/${product.toyId}`}
                        key={product.toyId}
                        onMouseEnter={() => setHoveredToyId(product.toyId)}
                        onMouseLeave={() => setHoveredToyId(null)}
                    >
                        <img
                            alt={`Image of ${product.name}`}
                            className="w-full h-40 object-cover"
                            src={
                                hoveredToyId === product.id
                                    ? product.imageUrls[0]
                                    : product.imageUrls[1]
                            }
                        />
                        <div className="p-2">
                            <div className="flex items-center mb-1">
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {product.description}
                                </span>
                            </div>
                            <div className="text-gray-500 line-through text-sm mb-1">
                                £{product.price.toFixed(2)}
                            </div>
                            <div className="text-red-600 text-lg font-bold mb-1">
                                £{product.price}
                            </div>
                            <div className="text-gray-700 text-sm mb-1">
                                {product.name}
                            </div>
                            <div className="text-gray-600 text-xs mb-1">
                                Manufacturer: {product.manufacturer} | Weight:{' '}
                                {product.weight} kg | Material:{' '}
                                {product.material}
                            </div>
                            <div className="text-green-600 text-xs mb-2">
                                {product.stock > 0
                                    ? 'In stock'
                                    : 'Out of stock'}
                            </div>
                            {hoveredToyId === product.id && (
                                <div className="flex space-x-1">
                                    <button
                                        className="flex-1 bg-white text-red-600 border border-red-600 rounded py-1 text-xs font-semibold"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleAddToCart(product)
                                        }}
                                    >
                                        Add to cart
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
            <Modal
                title={
                    <div className="flex justify-between items-center">
                        <span>Login Required</span>
                    </div>
                }
                open={isModalVisible}
                onCancel={handleOk}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <p>You need to log in to add items to the cart.</p>
            </Modal>
        </div>
    )
}

export default ProductList
