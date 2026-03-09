import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Signup from "./Pages/Signup.jsx"
import VerifyOTP from "./Pages/VerifyOTP.jsx"
import Navbar from "./Components/Navbar"
import Setting from "./Pages/Setting.jsx"
import Home from "./Pages/Home.jsx"
import Profile from "./Pages/Profile.jsx"
import Login from "./Pages/Login.jsx"

import userAuthStore from "./Stores/userStore.js"
import { useEffect } from "react"

const App = () => {

  const userAuth = userAuthStore((state) => state.userAuth);
  const checkAuth = userAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth
  }, [checkAuth])

  return (
    <main>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={userAuth ? <Home /> : <Navigate to="/Register" replace />} />
        <Route path="/Profile" element={userAuth ? <Profile /> : <Navigate to="/Register" replace />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Register" element={!userAuth ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/VerifyOTP" element={!userAuth ? <VerifyOTP /> : <Navigate to="/" replace />} />
        <Route path="/Login" element={!userAuth ? <Login /> : <Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App