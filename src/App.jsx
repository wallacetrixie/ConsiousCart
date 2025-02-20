import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Categories from './Categories.jsx';
import ProductDetails from './productDetails.jsx';
import CartDetails from './cartDetails.jsx';
import CheckoutRegistration from './checkoutRegistration.jsx';
import AIChat from './AiResponse.jsx';


function App() {
  return (
    <Router>
    <Navbar></Navbar>
  
      <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/ai" element={<AIChat />} />
      <Route path="/banner" element={<Banner />} />
      <Route path="/CheckoutRegistration" element={<CheckoutRegistration />} />
      <Route path="/CartDetails" element={<CartDetails />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      
    
      </Routes>
    </Router>
  );
}

export default App;
