import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};
export default App;
