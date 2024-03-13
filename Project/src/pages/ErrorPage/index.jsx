import React from "react";
import "./errorpage.css";

const ErrorPage = ({ errorMessage }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
