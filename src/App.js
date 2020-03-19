import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Layout from './components/layout/Layout';

function App() {
  const [images, setImages] = useState([]);
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(curPage);
  }, []);

  // When user changes page this will set a new current page and make a GET request for the next page of data
  const handlePageChange = (event, value) => {
    setCurPage(value);
    fetchData(value);
  }

  // Load our image data here using page as a param for pagination
  const fetchData = async (page) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios.get(`/image?page=${page}`); // get images data from our api
      setImages(result.data.images);
      setPages(result.data.pages);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };
  
  return (
    <div className="App">
      <Layout>
        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <Grid container spacing={2} alignItems="center">
            {images.map(img => (
              // auto-layout being used for Grid item to make items equitably share available space
              <Grid item xs key={img.url}> 
                <img src={img.url} alt=""/>
              </Grid>
            ))}
          </Grid>
        )}

        <Pagination count={pages} page={curPage} onChange={handlePageChange} />
      </Layout>
    </div>
  );
}

export default App;
