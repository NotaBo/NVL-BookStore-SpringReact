import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import { productsAdapter, fetchProductThunk } from '../../Product/productSlice';
import Card from '../Card/Card'
import { Product } from '../model/products';
import "./TrendingProducts.scss"



export const TrendingProducts = () => {
  const products = productsAdapter.getSelectors().selectAll(store.getState().product)
  const {status, productLoaded} = useSelector((state:any) => state.product)

  useEffect(()=>{

    if (!productLoaded) {
      store.dispatch(fetchProductThunk());
    }

  }, [productLoaded]);

  return (
    <div  className='TrendingProducts'>
      <div className="top">
        <h1>Trending products</h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
      </div>
    
      <div className="bottom">
          <Card products={products}/>
       </div>
    </div>
  )
}
