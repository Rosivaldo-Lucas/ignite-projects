import { createStitches } from '@stitches/react';

export const { config, styled, globalCss, keyframes, getCssText, theme, createTheme, css } = createStitches({
  theme: {
    colors: {
      shopapp: '#8257E6',
    }
  }
});

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0
  },
  body: {
    background: '#838383'
  }
});

globalStyles();
