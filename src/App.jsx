import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import Welcome from "./pages/welcome/Welcome";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import MiddleAuth from "./middleware/MiddleAuth";

function App() {
  const initialUser = localStorage.getItem("User");
  const [User, setUser] = useState(initialUser);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("User", user);
  };
  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("User");
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth handleLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <MiddleAuth>
              <Dashboard user={User} handleLogout={handleLogout} />
            </MiddleAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
