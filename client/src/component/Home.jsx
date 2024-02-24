import React, { useState } from 'react';
import BlurLoadingComponent from './L'; // Import the BlurLoadingComponent
import './style2.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete1 = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <BlurLoadingComponent onLoadingComplete={handleLoadingComplete1} />
      ) : (
        <div>
          <div className="container">
            <h1>Cool Modern Website</h1>
            <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>

          <div className="main-content">
            <div className="container">
              <p>This modern and cool website template is inspired by the aesthetics of GitHub, featuring a dark theme and stylish typography. It is fully responsive and ready to be adapted to any screen.</p>
            </div>
          </div>

          <div className="container">
            &copy; 2024 Cool Modern Website
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;