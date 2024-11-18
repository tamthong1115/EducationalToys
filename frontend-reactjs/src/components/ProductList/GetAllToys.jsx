import {useEffect, useState} from 'react'
import {useAuth} from "../../context/AuthContext.jsx";
import {Modal, Button} from 'antd'
import {createCartItem} from "../../API/CartAPI.js";
import {getAllToys} from "../../API/ToyAPI.js";
import {toast} from "react-hot-toast";
import ProductItem from "./ProductItem.jsx";

function GetAllToys() {
    const [hoveredToyId, setHoveredToyId] = useState(null)

    const [products, setProducts] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const {isAuthenticated} = useAuth();

    useEffect(() => {
        getAllToys().then((data) => {
            setProducts(data)
        })
    }, [])

    // console.log(products)

    const handleAddToCart = async (product) => {
        if (isAuthenticated) {
            try {
                const quantity = 1
                await createCartItem(product.id, quantity);
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

    // console.log(products)

    return (
        <div className="container mt-[60px]">
            <div className="text-black text-[24px] font-[700] mb-[24px]">
                Product List
            </div>
            <div className="grid grid-cols-4 gap-[20px]">
                {products.map((product) => (
                    <ProductItem product={product} setHoveredToyId={setHoveredToyId} handleAddToCart={handleAddToCart}
                                 hoveredToyId={hoveredToyId} key={product.id}/>
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

export default GetAllToys
