import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { Product } from '../model/products';
import "./List.scss"

const List = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data=>setProducts(data))
  }, []);

  return (
    <div className='List'>
        <Card products={products}/>
    </div>
  )
}

export default List