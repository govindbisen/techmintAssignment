import { useNavigate, useParams } from 'react-router-dom';
import CountryTimezoneDropdown from './CountryTimezoneDropdown';
import { useEffect, useState } from 'react';
import ClockDigital from './ClockDigital';
import './Profile.css';
import Button from './custombutton/Button';
import Card from './custombutton/Card';

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

  const handleGoBack = () => {
    navigate('/'); // Navigates back one step in the history stack
  };

  return (
    <div className='profile__container'>
      <div className='profile__container__header'>
        <Button onClick={handleGoBack}>BACK</Button>
        <CountryTimezoneDropdown setTimeZoneInProfile={setTimeZoneInProfile} />
        <ClockDigital timezone={timeZone} />
      </div>
      <div className='user__detail__container'>
        <div>
          <p>name:{userDetails.name}</p>
          <p>username:{userDetails.username}</p>
        </div>
        <div>
          <p>
            Address:
            {userDetails.address &&
              `${userDetails.address.street}, ${userDetails.address.suite}, ${userDetails.address.city}, ${userDetails.address.zipcode}`}
          </p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
        </div>
      </div>

      {/* <ClockDigital timezone= /> */}
      {/* <ClockDigital timezone='Asia/Dhaka' /> */}

      <div className='user__post__content'>
        {postsOfUser.map((p) => {
          return (
            <>
              <>
                <Card key={p.id}>
                  <p>{p.title}</p>
                  <p>{p.body}</p>
                </Card>
              </>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
