import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components
import Header from "./components/layout/Header/Header.js"
import Footer from './components/layout/Footer/Footer.js';
import Home from "./components/layout/Home/Home.js"

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
