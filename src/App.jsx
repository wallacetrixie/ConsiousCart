import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Navbar from './Navbar.jsx';	 

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
      
        {/* Tasks Route */}
        <Route path="/" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
