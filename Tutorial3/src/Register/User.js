import React, { useContext } from "react";
import UserContext from './usercontext';
const User = () => {
  const {firstname,lastname,email} = useContext(UserContext);


  return (
    <div className="data-content">
      <h1>User Data</h1>
     <h3> 
      <tr>
        <td>FirstName:</td>
        <td>{firstname}</td>
      </tr>

      <tr>
        <td>LastName:</td>
        <td>{lastname}</td>
      </tr>

      <tr>
        <td>Email:</td>
        <td>{email}</td>
      </tr>
       
      </h3>
    </div>
  );
};

export default User;
