import React from "react";
import Categories from "../components/Categories/Categories";
import Contact from "../components/Contact/Contact";
import Counter from "../components/counter/Counter";
import { FeaturedProducts } from "../components/FeaturedProducts/FeaturedProducts";
import Slider from "../components/Slider/Slider";
import { TrendingProducts } from "../components/TrendingProducts/TrendingProducts";
import './Home.scss'


const Home = () => {
    return (
        <div className="home">
            <Slider/>
            <FeaturedProducts/>
            <Categories/>
            <TrendingProducts/>
            <Contact/>
        </div>
    )
}

export default Home 