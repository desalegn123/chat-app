import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
    const {authUser}=useAuthStore()
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
