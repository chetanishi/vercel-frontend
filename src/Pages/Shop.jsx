import Hero from "../Components/Hero/Hero.jsx"
import NewCollection from "../Components/NewCollections/NewCollection.jsx"
import NewsLetter from "../Components/NewsLetter/NewsLetter.jsx"
import Offer from "../Components/Offers/Offers.jsx"
import Popular from "../Components/Popular/Popular.jsx"

function Shop()
{
    return (
       <div>
         <Hero/>
         <Popular /> 
         <Offer/>
         <NewCollection />
         <NewsLetter />
       </div>
    ) 
}
export default Shop