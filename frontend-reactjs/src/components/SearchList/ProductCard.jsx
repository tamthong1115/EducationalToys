import React from 'react'

const ProductCard = ({ name, price, oldPrice, image, stock, discount }) => {
    return (
        <article className="flex flex-col px-4 py-5 bg-white border max-w-[265px] border-solid border-zinc-500 border-opacity-20 shadow-[0px_1px_4px_rgba(128,128,128,0.11)]">
            {discount && (
                <div className="self-start px-1.5 py-1.5 text-sm font-bold leading-none text-white bg-red-500">
                    {discount}
                </div>
            )}
            <img
                loading="lazy"
                src={image}
                alt={name}
                className="object-contain mx-4 aspect-[0.67] w-[206px] max-md:mx-2.5"
            />
            <div className="flex flex-col items-start pt-5 pr-12 pb-0.5 mt-12 bg-white max-md:pr-5 max-md:mt-10">
                {oldPrice && (
                    <div className="text-sm leading-none text-neutral-400">
                        ${oldPrice.toFixed(2)}
                    </div>
                )}
                <div
                    className={`text-2xl leading-none ${
                        oldPrice ? 'text-red-500' : 'text-cyan-700'
                    }`}
                >
                    ${price.toFixed(2)}
                </div>
                <h3 className="mt-3 text-base leading-none text-stone-900">
                    {name}
                </h3>
                <div
                    className={`mt-4 text-sm leading-none ${
                        stock === 'In stock'
                            ? 'text-green-600'
                            : 'text-amber-500'
                    }`}
                >
                    {stock}
                </div>
            </div>
        </article>
    )
}

export default ProductCard
