import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Signin from './components/Signin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Private from './components/Private';
import Home from './components/Home'
import Post from './components/Post'
import RevokeAccess from './utilities/RevokeAccess';
import UsersProfile from './components/UsersProfile';
import PostDetail from './components/PostDetail';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App ">
        <Navbar />
        <Router>
          <Routes>
            <Route element={<Private />} >

              <Route path='' element={<Home />} />

            </Route>
            {/* <Route path="/users/:userId" element={<UserProfile />} /> */}
            <Route path="/users/:userId" element={<UsersProfile />} />

            <Route path="/post/:postId" element={<PostDetail />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/post' element={<Post />} />
            {/* <Route path='' element={<UserProfile/>}/> */}

          </Routes>
        </Router>
        {/* <RevokeAccess/> */}
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
