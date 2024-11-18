import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'
import FilterSection from './FilterSection'
import {Button, Dropdown, Input, Menu, Pagination} from 'antd'
import './searchList.css'
import {useSearchParams} from "react-router-dom";
import {searchToys} from '../../API/ToyAPI.js'
import {useQuery} from "@tanstack/react-query";
import ProductList from "../ProductList/ProductList.jsx";

const SearchList = () => {

    const [searchQuery] = useSearchParams()
    const q = searchQuery.get('q');
    const [currentPage, setCurrentPage] = useState(1);

    const [searchResults, setSearchResults] = useState([]);

    const {data, error, isLoading, isSuccess} = useQuery({
        queryKey: ['search', q, currentPage],
        queryFn: () => searchToys(q, currentPage),
    });

    useEffect(() => {
        if (isSuccess) {
            setSearchResults(data);
        }
    }, [data, isSuccess]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    console.log(searchResults)

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
                    {q.length} results for &quot;{q}&quot;
                </span>
            </nav>

            <Input.Search placeholder="Search" className="mt-6"/>

            <h2 className="self-start mt-9 text-lg font-extrabold leading-none text-stone-900">
                Filters
            </h2>

            <div className="flex gap-5 justify-between mt-3">
                <FilterSection/>
                <section className="flex flex-wrap gap-5 justify-between">
                    <ProductList products={searchResults}/>
                </section>
            </div>
            <div className="flex justify-center mt-4">
                <Pagination defaultCurrent={1} current={currentPage} onChange={handlePageChange}/>
            </div>
        </main>
    )
}

export default SearchList
