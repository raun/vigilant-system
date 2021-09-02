import { createTheme } from '@material-ui/core/styles';

export const muiTheme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    button: {
      fontSize: '12px',
      letterSpacing: 'initial',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 6
  },
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: 'var(--ripple-bg-color)'
      },
      rippleVisible: {
        opacity: 1
      }
    }
  }
});