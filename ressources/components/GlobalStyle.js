import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

body, html {
  background: ${props => props.theme.background};
  font-family: SFUIDisplay-Regular, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif, "Apple Color Emoji";
  overflow: hidden;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

a, a:active, a:visited {
  color: #0079FF;
}


@font-face {
  font-family: emoji;
  src: local('Apple Color Emoji'),
  /* Emoji unicode blocks */
  unicode-range: U+1F300-1F5FF, U+1F600-1F64F, U+1F680-1F6FF, U+2600-26FF;
}

`

export default GlobalStyle