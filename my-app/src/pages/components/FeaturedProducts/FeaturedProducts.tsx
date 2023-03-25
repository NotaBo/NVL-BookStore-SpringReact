import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import { fetchProductThunk, productsAdapter } from '../../Product/productSlice';
import Card from '../Card/Card'
import "./FeaturedProducts.scss"

export const FeaturedProducts = () => {
  const products = productsAdapter.getSelectors().selectAll(store.getState().product)
  const {status, productLoaded} = useSelector((state:any) => state.product)

  useEffect(()=>{

    if (!productLoaded) {
      store.dispatch(fetchProductThunk());
    }

  }, [productLoaded]);

  

  return (
    <div  className='FeaturedProducts'>
      <div className="top">
        <h1> Featured products</h1>
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
