const darkTheme = {
  background: '#212121',
  stroke: '#616161',
  text: '#A0A0A0',
  textInfo: '#ffffff',
  activeIconColor: '#0081E0',
  activeIconOpacity: 1.0,
  inactiveIconColor: '#ffffff',
  inactiveIconOpacity: 0.3,
  btnBg: '#3B3B3B',
  btnText: '#FFFFFF',
  primaryBtnBg: '#005A9D',
  primaryBtnText: '#ffffff',
  inputLabel: '#A8A8A8',
  inputText: '#ffffff',
  inputBackground: '#2D2D2D',

}

const lightTheme = {
  background: '#ffffff',
  stroke: '#B6B6B6',
  text: '#A0A0A0',
  textInfo: '#494949',
  activeIconColor: '#0081E0',
  activeIconOpacity: 1.0,
  inactiveIconColor: '#000000',
  inactiveIconOpacity: 0.2,
  btnBg: '#EBEBEB',
  btnText: '#494949',
  primaryBtnBg: '#005A9D',
  primaryBtnText: '#ffffff',
  inputLabel: '#A8A8A8',
  inputText: '#000000',
  inputBackground: '#FAFAFA'
}

export const getTheme = dark => {
  return dark ? darkTheme : lightTheme
}