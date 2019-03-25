import styled from 'styled-components'

const Page = styled.div`
  overflow: hidden;
  height: 240px;
  padding: 14px 16px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`
export default Page