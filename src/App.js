import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

import Pagination from '@material-ui/lab/Pagination';

import Layout from './components/layout/Layout';
import ControlPanel from './components/ControlPanel';
import ImageGrid from './components/ImageGrid';

function App() {
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
  }, [curPage]);

  // When user changes page this will set a new current page and make a GET request for the next page of data
  const handlePageChange = (event, value) => {
    setCurPage(value);
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
          <div>Loading ...</div>
        ) : (
          <ImageGrid images={images} />
        )}

        <Pagination count={pages} page={curPage} onChange={handlePageChange} />
      </Layout>
    </div>
  );
}

export default App;
