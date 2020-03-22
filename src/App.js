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
  },
  "MuiGrid-root": {
    height: "90%",
  }
}));

function App() {
  const classes = useStyles();

  // Images State set from api
  const [images, setImages] = useState([]);

  // Pagination
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(1);

  // Filter Query State
  const [filterQuery, setFilterQuery] = useState("");

  // Grayscale State
  const [isGrayscale, setIsGrayscale] = useState(false);

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(curPage, filterQuery); // Get images on page load
    // Having curPage and filterQuery in the dependency array below
    // will ensure that fetchData is run every time the page or filterQuery changes
  }, [curPage, filterQuery]); 

  // When user changes page this will set a new current page and make a GET request for the next page of data
  const handlePageChange = (event, value) => {
    setCurPage(value);
  }

  // Load our image data here using page as a param for pagination
  const fetchData = async (page, filter) => {
    setIsError(false);
    setIsLoading(true);

    let url = filterQuery != "" ? `/images/filter?${filter}&page=${page}` : `/images?page=${page}`;
    
    try {
      const result = await axios.get(url); // get images data from our api
      setTimeout(() => { // Using set timeout to allow the display of the loading indicator to give feedback to the user
        setImages(result.data.images);
        setPages(result.data.pages);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setIsError(true);
      setIsLoading(false)
    }
  };

  const handleFilterChange = (width, height) => {
    let queryString = `width=${width}&height=${height}`;
    setFilterQuery(queryString);
    setCurPage(1);
  }

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
        <ControlPanel handleFilterChange={handleFilterChange} toggleGrayscale={toggleGrayscale} />

        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <Grid 
            container 
            justify="center"
            alignItems="center"
            classes={{
              root: classes["MuiGrid-root"], // override base class styles
            }}
          >
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
