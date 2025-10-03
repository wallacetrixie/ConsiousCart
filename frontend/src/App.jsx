import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/PaymentForm" element={<PaymentForm/>} />
        <Route path="/ai" element={<AIChat />} />
        <Route path="/CheckoutRegistration" element={<CheckoutRegistration />} />
        <Route path="/CartDetails" element={<CartDetails />} />
        <Route path="/Homepage" element={
          isLoggedIn ? <Homepage /> : <Navigate to="/login" />
        } />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
