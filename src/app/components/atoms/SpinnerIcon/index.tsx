import React from 'react';
import './styles.css';
const SpinnerIcon = ({
  width,
  height
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div
      style={{
        width: `${width ? width : '24px'}`,
        height: `${height ? height : '24px'}`,
        border: '2px solid white',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}
    ></div>
  );
};

export default SpinnerIcon;
