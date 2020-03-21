import React, { useState, useEffect } from 'react';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './components/layout/Layout';
import ControlPanel from './components/ControlPanel';
import ImageGrid from './components/ImageGrid';

const useStyles = makeStyles(theme => ({
  pagination: {
    margin: 20,

    "& ul": {
      justifyContent: 'center'
    }
  }
}));

function App() {
  const classes = useStyles();

  // Images State set from api
  const [images, setImages] = useState([]);

  // Pagination
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(1);

  // Grayscale State
  const [isGrayscale, setIsGrayscale] = useState(false);

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(curPage); // Get images on page load
  }, [curPage]); // Having curPage in the dependency array will ensure that fetchData is run every time the page changes

  // When user changes page this will set a new current page and make a GET request for the next page of data
  const handlePageChange = (event, value) => {
    setCurPage(value);
  }

  // Load our image data here using page as a param for pagination
  const fetchData = async (page) => {
    setIsError(false);
    setIsLoading(true);

    
    try {
      const result = await axios.get(`/images?page=${page}`); // get images data from our api
      setTimeout(() => {
        setImages(result.data.images);
        setPages(result.data.pages);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setIsError(true);
      setIsLoading(false)
    }
  };

  // Load our image data here using page as a param for pagination
  const fetchFilteredData = async (page, widthOpt, heightOpt) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios.get(`/images/filter?width=${widthOpt}&height=${heightOpt}`); // pass width andheight as query params
      setTimeout(() => {
        setImages(result.data.images);
        setPages(result.data.pages);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const toggleGrayscale = () => {
    let imageDataCopy = [...images];
    
    if (isGrayscale) {
      imageDataCopy.forEach(img => img.url = img.url.replace("?grayscale", ""));
    } else {
      imageDataCopy.forEach(img => img.url = img.url + "?grayscale");
    }

    setIsGrayscale(!isGrayscale)
    setImages(imageDataCopy)
  }
  
  return (
    <div className="App">
      <Layout>
        <ControlPanel fetchFilteredData={fetchFilteredData} toggleGrayscale={toggleGrayscale} />

        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <ImageGrid images={images} />
        )}

        <Pagination className={classes.pagination} count={pages} page={curPage} onChange={handlePageChange} />
      </Layout>
    </div>
  );
}

export default App;
