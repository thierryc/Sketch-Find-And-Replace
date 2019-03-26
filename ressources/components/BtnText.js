import styled from 'styled-components'

const BtnText = styled.span`
  text-transform: uppercase;
  opacity: 0.33;
  font-size: 13px;
  line-height: 1.3rem;
  font-weight: 500;
  color: ${props => props.theme.btnText};
  letter-spacing: 0.8px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 3px;
  cursor: default;
  -webkit-user-select: none;
`

export default BtnText