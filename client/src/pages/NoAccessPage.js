import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/NoAccessPage.css";
import FormView from "../forms/FormView";

const NoAccessPage = () => {
  const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);

  return (
    <div className="noaccess-wrapper">
      <div className="noaccess-card">
        <div className="noaccess-icon-container">
          <div className="noaccess-lock">
            <div className="noaccess-lock-body"></div>
            <div className="noaccess-lock-shackle"></div>
          </div>
        </div>

        <h1 className="noaccess-title">Access Denied</h1>
        <p className="noaccess-message">
          You don’t have permission to view this page.
          <br /> Please log in or contact support if you believe this is an error.
        </p>

        <div className="noaccess-buttons">
          <button
            className="noaccess-btn noaccess-btn-primary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button
            className="noaccess-btn noaccess-btn-secondary"
            onClick={() => setOpenForm("signin")}
          >
            Login
          </button>
        </div>
      </div>
      <FormView openForm={openForm} setOpenForm={setOpenForm} />
    </div>
  );
};

export default NoAccessPage;
