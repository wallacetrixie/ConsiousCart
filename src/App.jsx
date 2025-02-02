import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
      
        {/* Tasks Route */}

        <Route path="/" element={<Navbar />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Banner" element={<Banner />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
