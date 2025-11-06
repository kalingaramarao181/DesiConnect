import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getResources } from "../api/authApi";
import Loader from "./Loader";
import FormView from "../forms/FormView";

const Secure = () => {
  const token = Cookies.get("jwtToken");
  const location = useLocation();
  const [allowed, setAllowed] = useState(null);
  const [openForm, setOpenForm] = useState(null); // for popup control

  useEffect(() => {
    const verifyAccess = async () => {
      // If token missing → open login popup
      if (!token) {
        setOpenForm("signin"); // ✅ open login popup
        setAllowed(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          alert("Session expired. Please log in again.");
          Cookies.remove("jwtToken");
          setOpenForm("signin"); // ✅ open login popup again
          setAllowed(false);
          return;
        }

        // Fetch backend allowed resources for role
        const resources = await getResources();
        const allowedNames = new Set(
          resources.map((r) => r.name.toLowerCase())
        );
        const currentPath = location.pathname.toLowerCase();

        // ✅ map of routes to backend resource names
        const routeToResource = {
          "/": "home",
          "/category/:categoryId": "category",
          "/adds": "car ads",
          "/ads/:adId": "ad details",
        };

        const resourceName = routeToResource[currentPath];

        if (resourceName && !allowedNames.has(resourceName)) {
          setAllowed(false);
        } else {
          setAllowed(true);
        }
      } catch (error) {
        console.error("Access verification failed:", error);
        Cookies.remove("jwtToken");
        setOpenForm("signin");
        setAllowed(false);
      }
    };

    verifyAccess();
  }, [token, location.pathname]);

  if (allowed === null) {
    return <Loader />;
  }

  return (
    <>
      {/* ✅ Always render popup, conditionally visible */}
      <FormView openForm={openForm} setOpenForm={setOpenForm} />
      {allowed ? (
        <Outlet />
      ) : // Don't redirect immediately; let popup open
      openForm === "signin" ? null : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default Secure;
