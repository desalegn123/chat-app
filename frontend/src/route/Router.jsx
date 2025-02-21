import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../page/Home'
import SignUp from '../page/SignUp'
import Login from '../page/Login'
import Settings from '../page/Settings'
import Profile from '../page/Profile'
import { useAuthStore } from '../store/useAuthStore'

const Router = () => {
  const {authUser}=useAuthStore()
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/profile' element={<Profile/>}/>

   
   </Routes>
  )
}

export default Router
