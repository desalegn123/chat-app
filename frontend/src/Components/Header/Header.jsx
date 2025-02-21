import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const Header = () => {
  const {authUser}=useAuthStore()
  return (
    <div>
      headers
    </div>
  )
}

export default Header
