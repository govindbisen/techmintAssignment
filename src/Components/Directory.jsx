import { useEffect, useState } from 'react';
import './Directory.css';
import { Link } from 'react-router-dom';
function Directory() {
  const [users, setUsers] = useState([]);
  const [userPostCounts, setUserPostCounts] = useState({});

  useEffect(() => {
    fetchUserData().then((data) => setUsers(data));
    //const userData = await fetchUserData();

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const postCounts = {};
        data.forEach((post) => {
          if (postCounts[post.userId]) {
            postCounts[post.userId]++;
          } else {
            postCounts[post.userId] = 1;
          }
        });
        setUserPostCounts(postCounts);
      });
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(' https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    return userData;
  };

  return (
    <>
      <h3>DICTIONARY</h3>
      <nav>
        <ul>
          {users.map((user) => (
            <>
              <li key={user.id}>
                <Link
                  to={`/${user.id}`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div className='user__list__data'>
                    <p className='user__name'>Name:{user.name} </p>
                    <p className='user__postcount'>
                      Posts:
                      {userPostCounts[user.id] ? userPostCounts[user.id] : 0}
                    </p>
                  </div>
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Directory;
