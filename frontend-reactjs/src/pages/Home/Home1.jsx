import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToysList from './ToysList';
import ToysDetailsPage from './ToysDetailsPage';
const Home1 = () => {
    return (
     
      <div className="text-center">
        {/* <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <p className="text-lg">Welcome to the home page of our application.</p> */}
        
        {/* <ToysList/> */}
        <ToysDetailsPage/>
       
           
      </div>
      
    );
  };
  
  export default Home1;