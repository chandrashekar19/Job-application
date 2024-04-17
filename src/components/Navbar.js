import React, { useState } from 'react'
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, logoutUser, clearStore } from '../features/user/userSlice'

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            className='btn'
            type='button'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <button
            type='button'
            className='dropdown-btn'
            onClick={() => dispatch(clearStore('Logging out...'))}
          >
            logout
          </button>
        </div>
      </div>
      <FaHome />
    </Wrapper>
  )
}

export default Navbar
