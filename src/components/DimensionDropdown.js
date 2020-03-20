import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

export default function DimensionDropdown({fetchFilteredData}) {
  // Filtering
  const [dimensionOpts, setDimensionOpts] = useState({});
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    getDimensionOpts(); // Get both width and height dimensions options for filter dropdowns
  }, []);

  const getDimensionOpts = async () => {
    try {
      const result = await axios.get('/dimensions'); // get dimension options from our api
      setDimensionOpts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDimensionChange = (event, dimensionType) => {
    if (dimensionType === "width") {
      setWidth(event.target.value);
      fetchFilteredData(1, event.target.value, height);
    } else {
      setHeight(event.target.value);
      fetchFilteredData(1, width, event.target.value);
    }
  }
  return (
    <div>
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
    </div>
  )
}
