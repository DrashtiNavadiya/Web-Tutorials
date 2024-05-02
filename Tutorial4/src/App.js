// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login/Login';
import ProfileList from './Components/Profile/ProfileList';
import ProfileDetail from './Components/Profile/ProfileDetail';

const App = () => {

  return (
    <Router>
          <Routes>
               <Route path="/" element={<LoginForm />} />
                  <Route path="/profile" element={<ProfileList />} />
                  <Route path="/profile/:id" element={<ProfileDetail />} />
          </Routes>

    </Router>
  );
};

export default App;
