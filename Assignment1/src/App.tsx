import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import SignUp from './components/Signup/Signup';

function App() {
  return (
      <div>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
