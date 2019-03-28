import styled from 'styled-components'

const Warning = styled.div`
  position: absolute;
  width: 100%;
  top: ${props => props.isActive ? -32 : 0}px;
  background-color: lime;
  color: ${props => props.theme.textInfo};
  z-index: 100;
  transition: top 0.15s ease-in-out;
`

export default Warning
