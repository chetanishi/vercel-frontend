import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import {useParams} from "react-router-dom"
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox.jsx";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts.jsx";

function Product()
{
    const {all_product}=useContext(ShopContext);
    const {productId}= useParams();
    const product= all_product.find((e) => e.id === Number(productId))
   
    return (
       <div> 
          {product ? (<Breadcrums product={product} />) : ( <p>Loading...</p> ) }  
           
           {
            product ? ( <ProductDisplay product={product} />) : ( <p>Loading...</p> )
           }
            <DescriptionBox />
            <RelatedProducts />
       </div> 
    )
}
export default Product