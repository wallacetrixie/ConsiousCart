import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Tasks from './pages/tasks.jsx';
import Homepage from './pages/Homepage.jsx';
import ProductDetails from './pages/productDetails.jsx';
import CartDetails from './pages/cartDetails.jsx';
import CheckoutRegistration from './pages/checkoutRegistration.jsx';
import AIChat from './pages/AiResponse.jsx';
import PaymentForm from './components/darajaAPI.jsx';
function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/PaymentForm" element={<PaymentForm/>} />
        <Route path="/ai" element={<AIChat />} />
        <Route path="/CheckoutRegistration" element={<CheckoutRegistration />} />
        <Route path="/CartDetails" element={<CartDetails />} />
        <Route path="/Homepage" element={
          isLoggedIn ? <Homepage /> : <Navigate to="/Login" />
        } />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;
