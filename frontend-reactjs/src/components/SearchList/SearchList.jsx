import React from 'react'
import ProductCard from './ProductCard'
import FilterSection from './FilterSection'
import { Button, Dropdown, Input, Menu, Pagination } from 'antd'
import './searchList.css'
const SearchList = () => {
    const products = [
        {
            id: 1,
            name: 'Motor Skill Basic Set',
            price: 466.0,
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/28be42c101a91820ed48161a6dc9e1ccebd2165535ec936b22b8fb6182662bbc?placeholderIfAbsent=true&apiKey=ee3b4c55f4e940649da4e87de99f1704',
            stock: 'Low stock',
        },
        {
            id: 2,
            name: 'Motor Skills Universal Set - 114 Pieces',
            price: 820.0,
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/47396cca980eef9d1c78071e642aa71a0d38eb37c4618fe80b3b2c327e68ae90?placeholderIfAbsent=true&apiKey=ee3b4c55f4e940649da4e87de99f1704',
            stock: 'Low stock',
        },
        {
            id: 3,
            name: 'Cutting Fruit',
            price: 16.0,
            oldPrice: 20.0,
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/35d6ee50c145ae0f7cfaa2caf0bc4cf10fc84698cd594523696871075e148936?placeholderIfAbsent=true&apiKey=ee3b4c55f4e940649da4e87de99f1704',
            stock: 'In stock',
            discount: 'Save 20%',
        },
        {
            id: 4,
            name: 'Sticklebrick Blue Square',
            price: 1.0,
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2263394a2e9129bdbd2ea31bd1f55c6f602bdff4da794f2969a5353e46d31fe6?placeholderIfAbsent=true&apiKey=ee3b4c55f4e940649da4e87de99f1704',
            stock: 'In stock',
        },
        // Add more product data as needed
    ]

    return (
        <main className="flex flex-col self-center mt-8 max-w-full w-[1350px]">
            <nav
                className="flex gap-2.5 self-start text-base leading-none"
                aria-label="Breadcrumb"
            >
                <a href="/" className="text-cyan-700">
                    Home
                </a>
                {'>'}
                <span className="basis-auto text-neutral-400">
                    210 results for "moto"
                </span>
            </nav>

            <Input.Search placeholder="Search" className="mt-6" />

            <h2 className="self-start mt-9 text-lg font-extrabold leading-none text-stone-900">
                Filters
            </h2>

            <div className="flex  gap-5 justify-between mt-3">
                <FilterSection />
                <section className="flex flex-wrap gap-5 justify-between">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </section>
            </div>
            <div className="flex justify-center mt-4">
                {' '}
                <Pagination />
            </div>
        </main>
    )
}

export default SearchList
