import React, { useState, useContext, useRef, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';


function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider(props) {
  const color = props.color;
  const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    color: '#000',
    height: 8,
  },
  margin: {
    height: theme.spacing(3),
  },
  }));

  const PrettoSlider = withStyles({
    root: {
      color: 'var(--purple)',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const classes = useStyles();
  const defaultValue = props.defaultValue;
  const [disabled, setDisabled] = useState(props.disabled);
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const categoryIndex = props.categoryIndex;



  function handleChange(e, newValue) {
    props.handleQuestionsNum(categoryIndex, newValue);
    setSliderValue(newValue)
  }

  return (
    <div className={`${classes.root} flex flex-row`}>
      <Slider getAriaValueText={valuetext}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="on"
      onChange={handleChange} value={defaultValue} step={1}
      marks
      min={1}
      max={6} />
      <span className="text-white mx-10">{sliderValue}</span>
    </div>
  );
}
