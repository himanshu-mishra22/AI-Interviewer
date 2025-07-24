import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'
import { useNavigate } from 'react-router';

const ProfileInfoCards = () => {
  const {user,clearUser} = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.clear();
    clearUser();
    navigate("/");
  }
  return user && (
    <div className='flex items-center'>
      <img src={user.profilePicUrl} alt="ProfilePic"  className='w-11 h-11 bg-gray-300 rounded-full mr-3'/>
      <div>
        <div className='text-[15px] text-black font-bold leading-3'>
          {user.name || ""}
        </div>
        <button className='text-amber-600 text-sm font-semibold cursor-pointer' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfoCards