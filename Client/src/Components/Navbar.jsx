import userAuthStore from "../Stores/userStore";

import {User, Settings} from "lucide-react" 

const Navbar = () => {

  const userAuth = userAuthStore((state) => state.userAuth)

  return (
    <nav>
      <a href="/" className="Logo flex">
        <img src="/Images/logo.jpg" alt="logo" width={20} />
        <h1 className="font-serif font-bold" >Whispr</h1>
      </a>
      <div className="flex gap-4">
        { userAuth ? (
            <a href="/Profile"> <User /> Profile</a>
          ) : 
          (
          <>
            <a href="/Register">Register</a>
            <a href="/Login">Login</a>
          </>
        )}
        <a href="/Setting"><Settings /> Setting </a>

      </div>
    </nav>
  )
}

export default Navbar;