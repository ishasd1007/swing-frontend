import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import { loginUser, registerUser } from "../services/api";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({});

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let err = {};

    if (!email) err.email = "Email required";
    else if (!email.includes("@")) err.email = "Invalid email";

    if (!password) err.password = "Password required";
    else if (password.length < 6) err.password = "Min 6 characters";

    if (!isLogin && !name) err.name = "Name required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (isLogin) {
        const res = await loginUser({ email, password });

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        window.location.href = "/dashboard";

      } else {
        await registerUser({ name, email, password });

        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      }

    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  return (
    <div className="home">
      <Navbar onLoginClick={() => setShowForm(true)} />

      <div className="hero">
        <div className="hero-content">
          <h1>Play. Win. Give Back.</h1>
          <p>Track scores, win draws & support charities.</p>
        </div>
      </div>

      {showForm && (
        <div className="popup">
          <div className="form">
            <span className="close" onClick={() => setShowForm(false)}>
              ✖
            </span>

            <h2>{isLogin ? "Login" : "Register"}</h2>

            {/* API ERROR */}
            {errors.api && <p className="error">{errors.api}</p>}

            {!isLogin && (
              <>
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </>
            )}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button onClick={handleSubmit}>
              {isLogin ? "Login" : "Register"}
            </button>

            <p
              className="toggle"
              onClick={() => {
                setIsLogin(!isLogin);
                setName("");
                setEmail("");
                setPassword("");
                setErrors({});
              }}
            >
              {isLogin
                ? "Create account"
                : "Already have an account?"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;