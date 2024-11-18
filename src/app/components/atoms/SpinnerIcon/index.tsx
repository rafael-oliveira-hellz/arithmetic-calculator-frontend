import React from "react";

const SpinnerIcon: React.FC = () => {
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        border: "2px solid white",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    ></div>
  );
};

export default SpinnerIcon;
