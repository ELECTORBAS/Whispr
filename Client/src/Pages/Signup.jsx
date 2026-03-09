import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserIcon, Mail, KeyRound, Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import userAuthStore from "../Stores/userStore.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const signup = userAuthStore((state) => state.signup);
  const isSigningUp = userAuthStore((state) => state.isSigningUp);

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await signup({name, email, password});
        navigate("/VerifyOTP");
      } catch (e) {
        toast.error(e.message);
      }
  };


  return (
    <section id="register">
      <div className="container w-2xl">
        <form id="register-form" onSubmit={handleRegister}>
          <h1 className="text-5xl font-bold">Registration</h1>
          <p className="light-text">
            Fill out the required information to register.
          </p>
          <div className="input-container">
            <div className="input-field">
              <UserIcon />
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                placeholder="Fullname"
              />
            </div>
            <div className="input-field">
              <Mail />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                placeholder="john@example.com"
              />
            </div>
            <div className="input-field">
              <KeyRound />
              <input
                type={!showPassword ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                placeholder="......"
              />
              {showPassword ? (
                <span
                  className="cursor-pointer pr-2"
                  onClick={() => setShowPassword(false)}
                >
                  <Eye />
                </span>
              ) : (
                <span
                  className="cursor-pointer pr-2"
                  onClick={() => setShowPassword(true)}
                >
                  <EyeClosed />
                </span>
              )}
            </div>
          </div>

          <button type="submit" disabled={isSigningUp} >
            {isSigningUp ? "Loading..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/Login">Login Here</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup