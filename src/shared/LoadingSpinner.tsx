import React from "react";
import './LoadingSpinner.css'

const LoadingSpinner: React.FC = () =>
(
    <div className="spinner-overlay">
        <div className="loading-spinner">
        </div>
    </div>
);

export default LoadingSpinner;