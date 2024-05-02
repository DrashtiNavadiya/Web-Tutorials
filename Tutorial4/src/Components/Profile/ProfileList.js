import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileList.css';

const ProfileList = ({ token }) => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('https://express-t4.onrender.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProfiles(response.data); 
        } else {
          console.error('Failed to fetch profiles');
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, [token]);

  const handleSearch = () => {
    const filteredProfiles = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProfiles(filteredProfiles);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className='heading'>List of Profiles</h2>
      <div className='container2'>
        <input
          className="center-input"
          type="text"
          placeholder="Search by First or Last Name"
          value={searchTerm}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
        <button className="btn-input btn2" onClick={handleSearch}>
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Search</span>
        </button>
      </div>

      <div className="profiles-container">
        {profiles.map((profile) => (
          <Link key={profile._id} to={`/profile/${profile._id}`}>
            <div className="profile-container">
              {profile.picture ? (
                <img src={profile.picture} alt={`${profile.name}'s profile`} style={{ width: '100px', height: '100px' }} />
              ) : (
                <div className="placeholder-container"></div>
              )}
              <p>{profile.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;