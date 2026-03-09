import userAuthStore from "../Stores/userStore"

import { LogOut } from "lucide-react"

const Setting = () => {

  const logout = userAuthStore((state) => state.logout)
  const userAuth = userAuthStore((state) => state.userAuth)

  const handleLogout = async (e) => {
    // e.preventDefault()
    try {
      await logout()
    } catch (e) {
      console.log(e.message);
      
    }
  }

  return (
    <section id='setting'>
      {userAuth ? (
        <button onClick={handleLogout}>
        <LogOut /> Logout
        </button>
      ) : (
        <h1>This is the Settings</h1>
      )}
      
    </section>
  )
}

export default Setting