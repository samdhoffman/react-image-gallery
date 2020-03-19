import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios.get('/image'); // get images data from our api

      setImages(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  return (
    <div className="App">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {images.map(img => (
            <li key={img.url}>
              <a href={img.url}>{img.img_id}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
