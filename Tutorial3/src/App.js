import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register/Register';
import User from './Register/User';
import UserContext from './Register/usercontext';

const App = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <UserContext.Provider value={{setFirstName,setLastName,setEmail,setPassword,firstname,lastname,email,password}}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Register></Register>} />
          <Route path="/user" exact element={<User/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
