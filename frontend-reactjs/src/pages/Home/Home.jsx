import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ToysList from '../../components/ToysDetail/ToysList'
import Banner from '../../components/Banner/Banner'
import Hero from '../../components/Hero/Hero'
import { ListOfToy } from '../../components/ListOfToy/ListOfToy'
import { ListOfCategorys } from '../../components/ListOfCategorys/ListOfCategorys'
import ProductList from '../../components/ProductList/ProductList'
const Home = () => {
    return (
        <div className="text-center">
            <Banner />
            <h1 className="text-3xl font-bold mb-4">Home Page</h1>
            <p className="text-lg">
                Welcome to the home page of our application.
            </p>
            <ToysList />
            <ListOfToy />
            <ProductList />
            <ListOfCategorys />
        </div>
    )
}
export default Home
