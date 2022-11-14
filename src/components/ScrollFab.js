import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { COLOR_PRIMARY } from '../utils/constants';

export default function ScrollFab() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    }
    else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Fab
      size="small"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 100,
        bgcolor: COLOR_PRIMARY,
        display: !visible && 'none'
      }}
      onClick={scrollToTop}
    >
      <KeyboardArrowUp />
    </Fab>
  );
}