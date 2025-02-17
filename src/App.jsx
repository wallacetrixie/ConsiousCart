import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Categories from './Categories.jsx';
import ProductDetails from './productDetails.jsx';
import AIChat from './AiResponse.jsx';


function App() {
  return (
    <Router>
    <Navbar></Navbar>
  
      <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      
    
      </Routes>
    </Router>
  );
}

export default App;
