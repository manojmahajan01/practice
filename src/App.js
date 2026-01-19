import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    fetch("https://caratcoreapi.divtech.in/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.success) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          alert("Login successful 🎉");
        } else {
          setLoginError(result.message || "Invalid username or password");
        }
      })
      .catch(() => {
        setLoginError("Network error. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h2 className="title">Sign In</h2>
        <p className="subtitle">Access your account</p>

        {loginError && <div className="error-box">{loginError}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;