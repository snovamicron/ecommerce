import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components
import Header from "./components/layout/Header/Header.js"
import Footer from './components/layout/Footer/Footer.js';
import Home from "./components/Home/Home.js"
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products';
import Search from './components/Product/Search.js'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/product/:id' element={<ProductDetails/>} />
      <Route exact path='/products' element={<Products/>} />
      <Route exact path='/search' element={<Search/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
