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
        <Grid container spacing={2}>
          {images.map(img => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={img.url}>
              <a href={img.url}>{img.img_id}</a>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default App;
