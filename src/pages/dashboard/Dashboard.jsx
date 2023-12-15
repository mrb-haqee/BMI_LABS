import React, { useState, useEffect } from "react";
import { Foto as img } from "../images/image";
import { Helmet } from "react-helmet";

import "./css/dashboard.css";
import MainDashboard from "./components/MainDashboard";
import MainAnalytics from "./components/MainAnalytics";
import api from "../../utils/Api";

export default function Dashboard({ user, handleLogout }) {
  const [isSidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [dataPredict, setDataPredict] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  const getDataPredict = async () => {
    const resp = await api.get("/api/v1/dashboard/get", {
      params: { email: user },
    });
    return resp.data;
  };

  const fetchData = async () => {
    try {
      const response = await getDataPredict();
      setDataPredict(response.data);
    } catch (err) {
      // Handle error here if necessary
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link rel="icon" href="" />
        dw
      </Helmet>

      <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
        <a href="#" className="brand">
          {/* <i className="bx bxs-smile" /> */}
          <i className='bx bx-pulse'></i>
          <span className="text">BMILabs</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Dashboard")}>
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activeMenuItem === "Analytics" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Analytics")}>
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Analytics</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a
              href="/"
              className="logout"
              onClick={() => {
                handleLogout();
              }}
            >
              <i className="bx bx-log-out" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={handleSidebarToggle} />
          <p href="#" className="nav-link">
            {activeMenuItem}
          </p>
          <a href="#" className="profile">
            <img src={img.foto} />
          </a>
        </nav>
        {activeMenuItem === "Dashboard" ? (
          <MainDashboard
            dataPredict={dataPredict}
            user={user}
            setDataPredict={setDataPredict}
          />
        ) : (
          <MainAnalytics dataPredict={dataPredict} />
        )}
      </section>
    </>
  );
}
