const theme = {
  colors: {
    primary: '#E13F5E',
    black: '#000000',
    white: '#ffffff',
    pink200: '#f09faf',
    pink500: '#E4526E',
    pink700: '#CA3854',
    gray50: '#F9FAFB',
    gray100: '#F2F4F8',
    gray200: '#D2D7E3',
    gray500: '#8E97A8',
    gray600: '#5B6573',
    gray700: '#2C323C',
    blue300: '#4c5464',
    blue400: '#21518C',
    blue500: '#165095',
    green500: '#007749',
    yellow400: '#F1AA3C',
    yellow500: '#FE9925',
  },
  sidebar: {
    width: '100px',
  },
  header: {
    height: {
      xs: '50px',
      md: '143px',
      lg: '181px',
    },
  },
}

export type ThemeType = typeof theme

export { theme }
