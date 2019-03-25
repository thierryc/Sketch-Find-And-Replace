import styled from 'styled-components'

const Input = styled.input`
  width: 63%;
  height: calc(2rem - 2px);
  font-size: 15px;
  padding: 0 8px;
  font-weight: 400;
  line-height: 1.1rem;
  letter-spacing: 0.92px;
  color: ${props => props.theme.inputText};
  background-color: ${props => props.theme.inputBackground};
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.stroke};
  border-radius: 2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
`
export default Input