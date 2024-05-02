import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfileDetail.css';

const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);
  const { id }= useParams ();

  useEffect(() => {
    const fetchProfileDetail = async () => {
      try {
          const response = await axios.get(`https://express-t4.onrender.com/api/users/${id}`);
          console.log(id)
          if (response.status === 200) {
            setProfile(response.data);
          } else {
            console.error('Failed to fetch profile details');
          }
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchProfileDetail();
  }, [id]);

  return (
    <body>
      <div className='center-div'>
        <div class="user-detail-container">
              {profile ? (

        <div class="user-detail">
                  <h2 className='text-detail'>Profile Detail Page</h2>
      <div class="upper-card">
      <div class="row">
        <div class="col-md-6">
          <div class="card user-profile-card" data-mh="card-one">
            <div class="card-img-top">
            <img src={profile.picture} alt={`${profile.name}'s profile`} style={{ width: '200px', height: '200px' }} />
            </div>
            <div class="card-body">
              <h3>Name: {profile.name}</h3>
              <p>About: {profile.about}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card user-detail-card" data-mh="card-one">
            <p><span>Gender :</span> {profile.gender}</p>
            <p><span>Email :</span> {profile.email}</p>

            <p><span>Balance :</span> {profile.balance}</p>
            <p><span>Age :</span> {profile.age}</p>
            <p><span>EyeColor :</span> {profile.eyecolor}</p>
            <p><span>Company :</span> {profile.company}</p>
            <p><span>Phone :</span> {profile.phone}</p>
            <p><span>Address :</span> {profile.address}</p>
            <p><span>Registered :</span> {profile.registered}</p>
            <p><span>Greeting :</span> {profile.greeting}</p>
            <p><span>Favorite Fruit :</span> {profile.favoriteFruit}</p>


          </div>
        </div>
      </div>
        </div>

        </div>
                ) : (
                  <p>Loading...</p>
                  )}
        </div>
        </div>
        </body>
  );
};

export default ProfileDetail;

/*    <div>
      <h2 className='text-detail'>Profile Detail Page</h2>
      {profile ? (
        <div className='text-detail'>
          <img src={profile.picture} alt={`${profile.name}'s profile`} style={{ width: '100px', height: '100px' }} />
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Balance: {profile.balance}</p>
          <p>Age: {profile.age}</p>
          <p>EyeColor: {profile.eyeColor}</p>
          <p>Gender: {profile.gender}</p>
          <p>Company: {profile.company}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
          <p>About: {profile.about}</p>
          <p>Registered: {profile.registered}</p>
          <p>Greeting: {profile.greeting}</p>
          <p>Favorite Fruit: {profile.favoriteFruit}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </div> */