import React from 'react'
import Button from '@material-ui/core/Button';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

export default function GrayscaleToggle({ toggleGrayscale, isDisabled }) {
  return (
    <div>
      {/* Toggle Images to Grayscale */}
      <Button
        variant="contained"
        color="default"
        className="grayscale-btn"
        startIcon={<InvertColorsIcon />}
        onClick={toggleGrayscale}
        disabled={isDisabled}
      >
        Toggle Grayscale
      </Button>
    </div>
  )
}
