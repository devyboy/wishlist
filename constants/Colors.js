const accentLight = '#FF6F5E'
const accentDark = '#FFA07A'

export default {
  light: {
    text: {
      header: '#000',
      subheader: 'rgba(0, 0, 0, 0.85)',
      body: 'rgba(0, 0, 0, 0.85)',
      subtitle: 'rgba(0, 0, 0, 0.4)'
    },
    background: '#FDFDFD',
    elevated: '#FFF',
    error: '#FF4545',
    success: '#42a642',
    shadow: 'rgba(0,0,0,0.2)',
    divider: '#DDD',
    scrollIndicator: 'black',
    accent: accentLight
  },
  dark: {
    text: {
      header: '#FFF',
      subheader: 'rgba(255, 255, 255, 0.85)',
      body: 'rgba(255, 255, 255, 0.85)',
      subtitle: 'rgba(255, 255, 255, 0.5)'
    },
    background: '#171717',
    elevated: '#2F2F2F',
    error: '#FF6666',
    success: '#5abd59',
    shadow: 'rgba(0,0,0,0.3)',
    divider: '#444',
    scrollIndicator: 'white',
    accent: accentDark
  }
}
