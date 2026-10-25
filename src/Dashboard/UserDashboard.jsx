
import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import UserSidebar from './UserSidebar'
import UserHome from './UserHome'
import Account from './Account'
import Trasnsaction from './Trasnsaction'
import History from './History'
import { Outlet } from 'react-router-dom'
import api from '../api/axios'

const UserDashboard = () => {


  const [User, setUser] = useState(null);
  

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(res.data.profile);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }

    



    loadProfile();
    
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <UserNav User={User} />

      <div className="flex h-[calc(100vh-64px)] items-start">
        {/* Sidebar */}
        <div className="lg:hidden lg:h-full  lg:w-64 lg:shrink-0 lg:md:block overflow-y-auto pb-20 md:pb-0">
          <UserSidebar User={User} />
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 h-full overflow-y-auto p-4 sm:p-6">
          <Outlet context={{ User}} />
        </main>
      </div>
    </div>
  )
}

export default UserDashboard