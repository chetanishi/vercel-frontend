import NavBar from "./Components/NavBar/NavBar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Footer from "./Components/Footer/Footer"
import men_banner from "./Components/Assets/banner_mens.png"
import women_banner from "./Components/Assets/banner_women.png"
import kid_banner from "./Components/Assets/banner_kids.png"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

function App() {


  return ( 
     <>
      <BrowserRouter>
         <NavBar />
        <Routes>
          
           <Route path="/" element={<Shop/>} />
           <Route path="/mens" element={ <ProtectedRoute>  <ShopCategory banner={men_banner} category="men" />  </ProtectedRoute>}  />
           <Route path="/womens" element={ <ProtectedRoute> <ShopCategory banner={women_banner} category="women"/> </ProtectedRoute> }  />
           <Route path="/kids" element={ <ProtectedRoute> <ShopCategory banner={kid_banner} category='kid'/> </ProtectedRoute> } />
           <Route path="/product" element={ <ProtectedRoute><Product/></ProtectedRoute> }>
             <Route path=":productId" element={<Product/> } /> 
           </Route>
           <Route path="/cart" element={ <ProtectedRoute> <Cart/> </ProtectedRoute> } />
           <Route  path="/login" element={<LoginSignup />} />
         </Routes>
         <Footer/>
      </BrowserRouter>
     </>
  )
}

export default App
