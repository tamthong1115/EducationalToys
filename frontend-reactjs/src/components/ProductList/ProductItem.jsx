import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    setHoveredToyId: PropTypes.func.isRequired,
    hoveredToyId: PropTypes.number,
    handleAddToCart: PropTypes.func.isRequired
}

function ProductItem({product, setHoveredToyId, hoveredToyId, handleAddToCart}) {
    return (
        <div>
            <Link
                to={`/toydetail/${product.toyId || product.id}`}
                key={product.toyId || product.id}
                onMouseEnter={() => setHoveredToyId(product.toyId || product.id)}
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
        </div>
    )
}

export default ProductItem
