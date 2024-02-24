import React, { useState, useEffect } from 'react';

const BlurLoadingComponent = ({ onLoadingComplete }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      onLoadingComplete(); // Notify the parent component that loading is complete
    }, 3000); // Adjust the duration (in milliseconds) as needed

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [onLoadingComplete]);

  return (
    <div >
      {/* Your loading content goes here */}
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span>Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default BlurLoadingComponent;