import styled from 'styled-components'

const Page = styled.div`
  overflow: hidden;
  height: 218px;
  padding: 14px 16px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`
export default Page