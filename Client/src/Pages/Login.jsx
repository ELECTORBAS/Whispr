import { useState } from "react";

import { Mail, KeyRound, Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import userAuthStore from "../Stores/userStore";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const login = userAuthStore((state) => state.login);
  const isLoggingIn = userAuthStore((state) => state.isLoggingIn);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password});
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
};

  return (
    <section id="login">
      <div className="container w-2xl">
        <form id="login-form" onSubmit={handleLogin}>
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="light-text">
            Fill out the required information to Login.
          </p>
          <div className="input-container">
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

          <button type="submit">{isLoggingIn ? "Logging In... " : "Login"}</button>
        </form>
        <p>
          Don't have an account? <a href="/Register">Register Here</a>
        </p>
      </div>
    </section>
  );
}

export default Login