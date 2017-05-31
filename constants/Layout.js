import {
  Dimensions,
} from 'react-native';

export default {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  width: {
    l: Dimensions.get('window').width * 0.8    /* 80% */
  },
  gutter: {
    xl: Dimensions.get('window').width * 0.08, /* ~32px */
    l: Dimensions.get('window').width * 0.06,  /* ~24px */
    m: Dimensions.get('window').width * 0.04,  /* ~16px */
    s: Dimensions.get('window').width * 0.02,  /* ~8px  */
    xs: Dimensions.get('window').width * 0.01, /* ~4px   */
  }
};