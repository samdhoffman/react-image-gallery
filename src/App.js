import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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
        <Grid container spacing={2} alignItems="center">
          {images.map(img => (
            // auto-layout being used for Grid item to make items equitably share available space
            <Grid item xs key={img.url}> 
              <img src={img.url}/>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default App;
