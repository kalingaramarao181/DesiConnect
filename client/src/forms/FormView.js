import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PasswordUpdate from "./PasswordUpdateForm";
import AddForm from "./AddForm/AddForm";
import "./styles/index.css";

const FormView = ({ openForm, setOpenForm, onLoginSuccess }) => {
  const closePopup = () => setOpenForm(null);

  const renderForms = () => {
    switch (openForm) {
      case "signin":
        return <LoginForm 
        closePopup={closePopup} 
        setOpenForm={setOpenForm} 
        onLoginSuccess={onLoginSuccess}
        />;
      case "register":
        return <RegisterForm closePopup={closePopup} setOpenForm={setOpenForm} />;
      case "password":
        return <PasswordUpdate closePopup={closePopup} setOpenForm={setOpenForm} />;
      case "add":
        return <AddForm closePopup={closePopup} setOpenForm={setOpenForm} />;
      default:
        return null;
    }
  };

  return (
    <>
      {openForm && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <div className="tf-form-popup-header">
              <button className="close-btn" onClick={closePopup}>
                X
              </button>
            </div>
            {renderForms()}
          </div>
        </div>
      )}
    </>
  );
};

export default FormView;
