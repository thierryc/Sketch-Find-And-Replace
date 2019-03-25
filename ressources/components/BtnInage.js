import styled from 'styled-components'

const BtnInage = styled.div`
width: 38px;
height: 32px;
opacity: ${props =>
  props.isActive
    ? props.theme.activeIconOpacity
    : props.theme.inactiveIconOpacity};
border-radius: 4px;
margin-left: 6px;
cursor: default;
-webkit-user-select: none;
`

export default BtnInage
