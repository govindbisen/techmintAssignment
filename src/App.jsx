import './App.css';
import Directory from './Components/Directory';
import { Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to='/'> Directory</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path='/' element={<Directory />} />
        <Route path='/:id' element={<Profile />} />
      </Routes>
      <div>
        {/* {posts.map((post) => (
          <ul key={post.id}>
            <li> {post.userId} </li>
            <li> {post.title} </li>
          </ul>
        ))} */}
      </div>
    </>
  );
}

export default App;
