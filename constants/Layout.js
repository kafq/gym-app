import {
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  width: {
    l:  windowWidth * 0.8,   /* 80%   */
    m:  windowWidth * 0.5,   /* 50%   */
    s:  windowWidth * 0.25,  /* 25%   */
    xs: windowWidth * 0.125, /* 12.5% */
    video: windowWidth * 0.3,
  },
  height: {
    video: windowWidth * 0.22, /* 14% of 16:9 ratio */
    s: windowHeight * 0.14
  },
  gutter: {
    xl: windowWidth * 0.08,  /* ~32px */
    l:  windowWidth * 0.06,  /* ~24px */
    m:  windowWidth * 0.04,  /* ~16px */
    s:  windowWidth * 0.02,  /* ~8px  */
    xs: windowWidth * 0.01,  /* ~4px  */
    sxs: windowWidth * 0.03, /* ~12px */
  }
};