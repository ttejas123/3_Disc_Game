import { useEffect, useState } from 'react';
import style from '../styles/upload.module.css';
import axios from 'axios';
import Product from './Product';

function ProductList() {
    const [list, setlist] = useState([]);

    useEffect(()=> {
        const fetch = async() => {
            const data = await axios.get('/api/product_apis/productRead');

            setlist([...data.data.Products]);
        }            
        fetch();
    }, [])

  return (
    <div className={style.box}>
    <h2 className={style.header}>
        Product List
    </h2>

    <div className='grid grid-cols-4'>
        {list.map((val, i) => {
            return (<Product key={i} Product_name={val.Name} Product_id={val._id} />)
        })}
    </div>
</div>
  )
}

export default ProductList