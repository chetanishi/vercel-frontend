import "./Offers.css"
import exclusive_img from "../Assets/exclusive_image.png"


function Offer()
{
    return(
      <div className="offers">
         <div className="offers-left">
            <h1>EXclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check NOw</button>
         </div>
         <div className="offers-right">
            <img src={exclusive_img} alt="" />
         </div>
      </div>
    )
}

export default Offer