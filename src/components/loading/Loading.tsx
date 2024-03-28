import React from "react";
import "./loading.css";

export const Loading = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner-dot"></div>
      <div className="loading-spinner-dot"></div>
      <div className="loading-spinner-dot"></div>
      <div className="loading-spinner-dot"></div>
      <div className="loading-spinner-dot"></div>
    </div>
  );
};
