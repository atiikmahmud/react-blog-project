import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Layouts from './components/Layouts';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import AddPost from './pages/AddPost';
import Posts from './pages/Posts';
import Blog from './pages/Blog';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import AllPosts from './pages/admin/AllPosts';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';
import EditUser from './pages/admin/EditUser';
import SinglePost from './pages/SinglePost';
import UserPost from './pages/admin/UserPost'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layouts/> }>
          <Route path='/' element={ <Home/> } />
          <Route path='/profile' element={ <PrivateRoute><Profile/></PrivateRoute> }/>
          <Route path='/about' element={ <About/> }/>
          <Route path='/contact' element={ <Contact/> }/>
          <Route path='/add-post' element={ <PrivateRoute><AddPost/></PrivateRoute> }/>
          <Route path='/posts' element={ <PrivateRoute><Posts/></PrivateRoute> }/>
          <Route path='/blog' element={ <Blog/> }/>
          <Route path='/blog/post/:id' element={ <SinglePost/> }/>
          <Route path='/dashboard' element={ <AdminRoute><Dashboard/></AdminRoute> }/>
          <Route path='/users' element={ <AdminRoute><Users/></AdminRoute> }/>
          <Route path='/users/post/:id' element={ <AdminRoute><UserPost/></AdminRoute> }/>
          <Route path='/edit-user/:id' element={ <AdminRoute><EditUser/></AdminRoute> }/>
          <Route path='/all-posts' element={ <AdminRoute><AllPosts/></AdminRoute> }/>
        </Route>
        <Route path='/login' element={ <PublicRoute><Login/></PublicRoute> }/>
        <Route path='/register' element={ <PublicRoute><Register/></PublicRoute> }/>
        <Route path='/*' element={ <NoPage/> }/>
      </Routes>
    </Router>
  );
}