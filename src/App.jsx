import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Tasks from './tasks.jsx';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Categories from './Categories.jsx';

function App() {
  return (
    <Router>
      {/* Navbar is outside Routes so it stays on all pages */}
      <Navbar />

      <Routes>
        {/* Home Page - Shows Banner below Navbar */}
        <Route path="/" element={<Banner />} />
        <Route path="/" element={<Categories/>}/>

        {/* Other Routes */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
