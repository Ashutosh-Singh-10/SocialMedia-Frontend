import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Signin from './components/Signin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Private from './components/Private';
import Home from './components/Home'
import Post from './components/Post'
import RevokeAccess from './utilities/RevokeAccess';
import UserProfile from './components/UserProfile';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <div className="App ">
<Navbar/>
<Router>
      <Routes>
          <Route element={<Private/>} >
              
              <Route path='' element={<Home/>}/>

          </Route>
            <Route path="/users/:userId" element={<UserProfile/>} />
            <Route path="/post/:postId" element={<PostDetail/>} />

          <Route path='/login' element={<Login/>}/>
          <Route path='/post' element={<Post/>}/>
          {/* <Route path='' element={<UserProfile/>}/> */}
          
      </Routes>
  </Router>
  {/* <RevokeAccess/> */}
    </div>
  );
}

export default App;
