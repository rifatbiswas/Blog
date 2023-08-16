import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Auth from './components/Auth'
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs'
import BlogsDetails from './components/BlogsDetails'
import AddBlogs from './components/AddBlogs'
import { useSelector } from 'react-redux'

function App() {
 
const isLoggedIn = useSelector(state=>state.isLoggedIn);

console.log(isLoggedIn);
  return (
   <BrowserRouter>      
        <Header/> 
        <Routes>
          <Route path='/auth'  element={<Auth/>}></Route>
          <Route path='/blogs'  element={<Blogs/>}></Route>
          <Route path='/blogs/add'  element={<AddBlogs/>}></Route>
          <Route path='/myBlogs'  element={<UserBlogs/>}></Route>
          <Route path='/myBlogs/:id'  element={<BlogsDetails/>}></Route>         
        </Routes>
        </BrowserRouter>  
  )
}

export default App
