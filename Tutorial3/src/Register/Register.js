import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './usercontext';
import validator from 'validator';
import './Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const history = useNavigate();
  const { setFirstName, setLastName, setEmail, setPassword, firstname, lastname, email, password } = useContext(UserContext);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleFirstName = (e) => {
    const inputFirstName = e.target.value;
    setFirstName(inputFirstName);
    if (!validator.isAlpha(inputFirstName)) {
      toast.error("First name must contain only alphabetic characters");
    }
  };

  const handleLastName = (e) => {
    const inputLastName = e.target.value;
    setLastName(inputLastName);
    if (!validator.isAlpha(inputLastName)) {
      toast.error("Last name must contain only alphabetic characters");
    }
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleConfirmPassword = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);

    if (inputConfirmPassword !== '' && password !== inputConfirmPassword) {
      setPasswordMatchError(true);
    } 
    else{setPasswordMatchError(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstname === "") {
      toast.error("Please enter your first name");
      return false;
    }
    if (lastname === "") {
      toast.error("Please enter your last name");
      return false;
    }
    if (email === "") {
      toast.error("Please enter your email");
      return false;
    }
    if(!validator.isEmail(email)){
      toast.error("Please enter valid email");
      return false;
    }
    if(password === ""){
      toast.error("Please enter password");
      return false;
    }
    if(!validator.isStrongPassword(password)){
      toast.error("Password should contain e Capital letter number and special character");
      return false;
    }
    if(confirmpassword === ""){
      toast.error("Please enter confirm password");
      return false;
    }
    if(confirmpassword !== password){
      toast.error("password and confirm password should match");
      return false;
    }
    
    history("/user", {
      firstname,
      lastname,
      email,
      password,
    });
  };



  return (
    <div className="Form" onSubmit={handleSubmit}>
      <form id="form">
        <div>
          <center><h1>User Registration</h1></center>
        </div>

        <div className="input-group">
          <label className="label">First Name</label>
          <input
            onChange={handleFirstName}
            className="input"
            value={firstname}
            type="text"
            id="firstname"
          />
        </div>

        <div className="input-group">
          <label className="label">Last Name</label>
          <input
            onChange={handleLastName}
            className="input"
            value={lastname}
            type="text"
            id="lastname"
          />
        </div>

        <div className="input-group">
          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="text"
            id="email"
          />
        </div>

        <div className="input-group">
          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
            id="password"
          />

        </div>

        <div className="input-group">
          <label className="label">Confirm Password</label>
          <input
            onChange={handleConfirmPassword}
            className={`input ${passwordMatchError ? 'border-red' : ''}`} 
            value={confirmpassword}
            type="password"
            id="confirmpassword"
          />
        </div>

        <center><button   
          className="btn"
          type="submit"
        >
          Submit
        </button></center>
      </form>
    </div>
  );
};

export default Register;
