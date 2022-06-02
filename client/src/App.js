import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'

// components
import Header from "./components/layout/Header.js"

function App() {
  return (
    <Router>
      <Header/>
    </Router>
  );
}

export default App;
