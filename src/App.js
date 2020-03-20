import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Layout from './components/layout/Layout';
import { MenuItem } from '@material-ui/core';

function App() {
  const [images, setImages] = useState([]);

  // Pagination
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(1);

  // Filtering
  const [dimensionOpts, setDimensionOpts] = useState({});
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [heightOpts, setHeightOpts] = useState([]);

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(curPage); // Get images on page load
  }, []);

  useEffect(() => {
    getDimensionOpts(); // Get both width and height dimensions options for filter dropdowns
  }, []);

  // When user changes page this will set a new current page and make a GET request for the next page of data
  const handlePageChange = (event, value) => {
    setCurPage(value);  
    fetchData(value);
  }

  const handleDimensionChange = (event, dimensionType) => {
    if (dimensionType == "width") {
      setWidth(event.target.value)
      fetchFilteredData(1, event.target.value, height);
    } else {
      setHeight(event.target.value);
      fetchFilteredData(1, width, event.target.value);
    }
  }

  // Load our image data here using page as a param for pagination
  const fetchData = async (page, dimensions) => {
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

  // Load our image data here using page as a param for pagination
  const fetchFilteredData = async (page, widthOpt, heightOpt) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios.get(`/image/filter?width=${widthOpt}&height=${heightOpt}`); // pass width andheight as query params
      setImages(result.data.images);
      setPages(result.data.pages);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const getDimensionOpts = async () => {
    try {
      const result = await axios.get('/dimensions'); // get dimension options from our api
      setDimensionOpts(result.data)
    } catch (error) {
      setIsError(true);
    }
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
              <Grid container item xs key={img.url} justify="center"> 
                <img src={img.url} alt=""/>
              </Grid>
            ))}
          </Grid>
        )}

        <Pagination count={pages} page={curPage} onChange={handlePageChange} />
        
        {/* Width Filter Options */}
        <InputLabel id="width-select-label">Width</InputLabel>
        <Select
          labelId="width-select-label"
          id="width-select"
          value={width}
          onChange={e => handleDimensionChange(e, "width")}
        >
          {dimensionOpts.widths && dimensionOpts.widths.map(width => (
            <MenuItem value={width} key={width}>{width}</MenuItem>
          ))}
        </Select>

        {/* Height Filter Options */}
        <InputLabel id="height-select-label">Height</InputLabel>
        <Select
          labelId="height-select-label"
          id="height-select"
          value={height}
          onChange={e => handleDimensionChange(e, "height")}
        >
          {dimensionOpts.heights && dimensionOpts.heights.map(height => (
            <MenuItem value={height} key={height}>{height}</MenuItem>
          ))}
        </Select>

      </Layout>
    </div>
  );
}

export default App;
