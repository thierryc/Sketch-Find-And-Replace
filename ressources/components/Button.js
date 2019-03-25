import styled from 'styled-components'

const Button = styled.button`
  flex-grow: 1;
  border: 0;
  box-shadow: none;
  padding: 6px 8px;
  background-color: ${props =>
    props.primary ? props.theme.primaryBtnBg : props.theme.btnBg};
  border-radius: 2px;
  font-size: 15px;
  color: ${props =>
    props.primary ? props.theme.primaryBtnText : props.theme.btnText};
  letter-spacing: 0;
  opacity: ${props =>
    props.isActive
      ? props.theme.activeIconOpacity
      : props.theme.inactiveIconOpacity};
  transition: opacity 0.15s ease-in-out;
`


export default Button