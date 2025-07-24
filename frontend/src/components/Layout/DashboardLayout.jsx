import React, { useContext } from 'react'
import { userContext } from '../../context/userContext.jsx'
import Navbar from './Navbar';

export const DashboardLayout = ({children}) => {
    const {user} = useContext(userContext);
  return (
    <div>
        <Navbar/>
        {user && <div>{children}</div>}
    </div>
  )
}
