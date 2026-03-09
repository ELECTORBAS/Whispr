import userAuthStore from "../Stores/userStore";

const Navbar = () => {

  const { userAuth } = userAuthStore;

  return (
    <nav>
      <a href="/" className="Logo flex">
        <img src="/Images/logo.jpg" alt="logo" width={20} />
        <h1 className="font-serif font-bold" >Whispr</h1>
      </a>
      <div className="flex gap-4">
        <a href="/Profile">Profile</a>
        {/* { !userAuth ? (
          <a>
            <a href="/Profile">Profile</a>
          </>
          ) : 
          (
          <>
            <a href="/Register">Register</a>
            <a href="/Login">Login</a>
          </>
        )} */}
        <a href="/Register">Register</a>
        <a href="/Login">Login</a>
          
          <a href="/Setting">Setting</a>

      </div>
    </nav>
  )
}

export default Navbar;