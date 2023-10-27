import { useNavigate, useParams } from 'react-router-dom';
import CountryTimezoneDropdown from './CountryTimezoneDropdown';
import { useEffect, useState } from 'react';
import ClockDigital from './ClockDigital';
import './Profile.css';

function Profile() {
  const [timeZone, setTimeZoneInProfile] = useState('');
  const [userDetails, setuserDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = parseInt(id, 10);
  const [postsOfUser, setPostsOfUser] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((res) => setuserDetails(res));

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setPostsOfUser(data));
  }, []);

  console.log('userDetails', userDetails);
  const handleGoBack = () => {
    navigate('/'); // Navigates back one step in the history stack
  };

  return (
    <div className='profile__container'>
      <div className='profile__container__header'>
        <button onClick={handleGoBack}>BACK</button>
        <CountryTimezoneDropdown setTimeZoneInProfile={setTimeZoneInProfile} />
        <ClockDigital timezone={timeZone} />
      </div>
      <p>name:{userDetails.name}</p>
      <p>username:{userDetails.username}</p>
      <p>Email: {userDetails.email}</p>
      <p>Phone: {userDetails.phone}</p>
      <p>
        Address:
        {userDetails.address &&
          `${userDetails.address.street}, ${userDetails.address.suite}, ${userDetails.address.city}, ${userDetails.address.zipcode}`}
      </p>
      {/* <ClockDigital timezone= /> */}
      {/* <ClockDigital timezone='Asia/Dhaka' /> */}

      <div>
        {postsOfUser.map((p) => {
          return (
            <>
              <li key={p.id}>
                <p>{p.title}</p>
                <p>{p.body}</p>
              </li>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
