import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import clickSfx from '../components/click.mp3';

const audio = new Audio(clickSfx); // useMemo doesn't work, browser will still request serveral times for this mp3 file.

export const DelayLink = props => {
  const { delay, onDelayStart, onDelayEnd, replace, goBackHome,...rest } = props;
  let to = props.to;
  let timeout = null;
  let history = useHistory();
  let location = useLocation();
  const lastLocation = useLastLocation();
  useEffect(() => {
    if (lastLocation && lastLocation.pathname === '/' && goBackHome === true) {
      to = null;
    }
  }, [lastLocation])

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const handleClick = e => {
    // playClick();
    audio.play();
    // if trying to navigate to current page stop everything
    if (location?.pathname === to) return;

    onDelayStart(e, to);
    if (e.defaultPrevented) {
      return;
    }

    e.preventDefault();

    timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
      onDelayEnd(e, to);
    }, delay);
    if (lastLocation && lastLocation.pathname === '/' && location?.pathname !=='/' && goBackHome === true) {
      history.goBack();
    }
  };

  return <Link {...rest} to={to} onClick={handleClick} />;
};

DelayLink.propTypes = {
  // Milliseconds to wait before registering the click.
  delay: PropTypes.number,
  // Called after the link is clicked and before the delay timer starts.
  onDelayStart: PropTypes.func,
  // Called after the delay timer ends.
  onDelayEnd: PropTypes.func,
  // Replace history or not
  replace: PropTypes.bool,
  // Link to go to
};

DelayLink.defaultProps = {
  replace: false,
  delay: 0,
  onDelayStart: () => {},
  onDelayEnd: () => {}
};

export default DelayLink;
