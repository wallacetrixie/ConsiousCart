import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Homepage from './Homepage.jsx';
import ProductDetails from './productDetails.jsx';
import CartDetails from './cartDetails.jsx';
import CheckoutRegistration from './checkoutRegistration.jsx';
import AIChat from './AiResponse.jsx';
import PaymentForm from './darajaAPI.jsx';
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
