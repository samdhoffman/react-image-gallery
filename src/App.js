import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/image'); // get images data from our api
        setImages(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  return (
    <div className="App">
      {isError && <div>Something went wrong ...</div>}

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
