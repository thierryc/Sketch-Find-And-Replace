
import React from 'react'
import styled from 'styled-components'
import InputLabel from './InputLabel'
import Button from './Button'

import RegexIcon from './svg-icons/RegexIcon'
import CaseSensitiveIcon from './svg-icons/CaseSensitiveIcon'
import WholeWordIcon from './svg-icons/WholeWordIcon'

import SelectionIcon from './svg-icons/SelectionIcon'
import PageIcon from './svg-icons/PageIcon'
import DocumentIcon from './svg-icons/DocumentIcon'

const HelpPage = styled.div`
  position: absolute;
  top: ${props => props.isActive ? 0 : 240}px;
  width: 100%;
  overflow: scroll;
  height: 218px;
  padding: 14px 16px 16px 16px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  z-index: 100;
  transition: top 0.15s ease-in-out;
  margin-bottom: 32px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`

const HelpIconsContainer = styled.div`
  display: flex; /* or inline-flex */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`

const HelpIcon = styled.div`
  margin-right: 1em;
  
`

const HelpIconDescription = styled.div`
  
`

const BtnHelpContainer = styled.div`
  display: flex; /* or inline-flex */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 2em;
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
    <h2>Sketch Find and Replace</h2>
    <p>By <a href={'mailto:hello@anotherplanet.io'}>Thierry Charbonnel</a> - UX / UI and Code Designer </p>
    
    <h3>Options to find</h3>

    <HelpIconsContainer>
      <HelpIcon><RegexIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>Regex (Regular expressions)*</HelpIconDescription>
    </HelpIconsContainer>

    <HelpIconsContainer>
      <HelpIcon><CaseSensitiveIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>Case Sensitive (on)/ Case Insensitive (off)</HelpIconDescription>
    </HelpIconsContainer>

    <HelpIconsContainer>
      <HelpIcon><WholeWordIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>Whole Word</HelpIconDescription>
    </HelpIconsContainer>

    <p>* Tips: Turn Regex off if you don't know what Regex is.</p>

    <h3>Replace context</h3>

    <HelpIconsContainer>
      <HelpIcon><SelectionIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>Selection (visible if a selection is active)</HelpIconDescription>
    </HelpIconsContainer>

    <HelpIconsContainer>
      <HelpIcon><PageIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>Current page</HelpIconDescription>
    </HelpIconsContainer>

    <HelpIconsContainer>
      <HelpIcon><DocumentIcon theme={theme} isActive={true}/></HelpIcon>
      <HelpIconDescription>All pages of a document</HelpIconDescription>
    </HelpIconsContainer>

    <p>By default Find and Replace don’t replace string of symbols master except if you are in selection mode or on the “Symbols” named page.</p>

    <h3>Know limitation</h3>

    <p>Backslash not allowed in the replace input.</p>
    <p>Exit the text editon mode before to replace string</p>

    <h3>Regex (Regular expressions)</h3>
    <p>Get the Regex Power! <span style={{fontFamily: 'emoji'}}>⚡️</span></p>
    <p>Regular expressions are patterns used to match character combinations in strings.</p>
    <p><a href={'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'}>MDN Regular Expressions Guide</a></p>
    <p><a href={'https://javascript.info/regular-expressions'}>Javascript.info Regular Expressions Guide</a></p>    
    <h4>Some Examples</h4>
    <p>The power of search and replace with regex.</p>
    <p>Let's use the search and replace example from above:</p>

    <h4>Convert "John Smith" to "Smith John"</h4>
    <p>Find</p>
    <pre>(\w+)\s+(\w+)</pre>
    <p>Replace with</p>
    <pre>$2 $1</pre>
    <p>Result: Smith John.</p>

    <h4>Replace all double spaces</h4>
    <p>Find</p>
    <pre>{'\s{2,}'}</pre>
    <p>Replace with</p>
    <pre>(one space)</pre>

    <p>and more...</p>

    <h3>Say Hello</h3>
    <p>I’m always happy to be involved into interesting projects.</p>
    <p><a href={'mailto:hello@anotherplanet.io'}>hello@anotherplanet.io</a></p>
    <p><a href={'https://twitter.com/Autre_planete?ref=sketch'}>twitter: @Autre_planete</a></p>
    <p><a href={'https://github.com/thierryc?ref=sketch'}>Github: @thierryc</a></p>
    <img style={{ opacity: 0.1 }}src="https://www.google-analytics.com/collect?v=1&tid=UA-37385154-1&cid=555&aip=1&t=event&ec=plugin&ea=help&dp=%2FFindAndReplace&dt=FindAndReplace"/>
    
    <BtnHelpContainer><Button onClick={close} theme={theme} primary theme={theme} isActive={true}>
      Close Help
    </Button></BtnHelpContainer>




    
  </HelpPage>
}
  
export default Help
