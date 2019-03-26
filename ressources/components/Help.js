
import React from 'react'
import styled from 'styled-components'
import InputLabel from './InputLabel'
import Button from './Button'

const HelpPage = styled.div`
  position: absolute;
  top: ${props => props.isActive ? 0 : -268}px;
  width: 100%;
  overflow: scroll;
  height: 240px;
  padding: 14px 16px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  z-index: 100;
  transition: position 0.15s ease-in-out;
`

const Help = (props) => {
  const { 
    isActive,
    theme,
    close,
  } = props
  return <HelpPage 
    isActive={isActive}
    theme={theme}
    >
    <InputLabel theme={theme}>Help</InputLabel> 
    <h2>Sketch Find and Replace v2.</h2>
    <p>By Thierry Charbonnel</p>
    <p><a href={'mailto:thierry@anotherplanet.io'}>thierry@anotherplanet.io</a></p>
    <h3>Regex (Regular expressions)</h3>
    <p>Regular expressions are patterns used to match character combinations in strings.</p>

    <Button onClick={close} theme={theme}>
      Close Help
    </Button>
  </HelpPage>
}
  
export default Help
