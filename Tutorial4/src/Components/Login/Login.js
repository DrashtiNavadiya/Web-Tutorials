import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch('https://express-t4.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/profile');
      } else {
        console.error('Login failed');
        toast.error('Incorrect email or password', {
          position: 'top-right',
          autoClose: 5000, // Close the toast after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (

<body>
<div class="login">
	<h1>Login</h1>
    <form method="post" onSubmit={handleSubmit}>
    	  <input 
        type="email" 
        id="email"
        name="email" 
        placeholder="Email" 
        required="required"
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        id="password"
        name="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required="required" 
        />
        <button type="submit" class="btn btn-primary btn-block btn-large">Submit</button>
    </form>
    <ToastContainer />
</div>
</body>



/*     <body>
    <div className="login-container">
      <h2 className='h2'>Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className='input-login'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='btn1'>Submit</button>
      </form>
      <ToastContainer />
    </div>
    </body> */
  );
};

export default Login;
