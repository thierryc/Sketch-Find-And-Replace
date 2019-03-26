import React, { Fragment } from 'react'
import { getTheme } from './Colors'
import styled, { createGlobalStyle } from 'styled-components'
import Help from './Help'

import Page from './Page'
import Row from './Row'
import RowGroup from './RowGroup'
import InfoRowGroup from './InfoRowGroup'
import BtnGroup from './BtnGroup'
import Button from './Button'
import BtnText from './BtnText'
import BtnInage from './BtnInage'
import Input from './Input'

import ActionBar from './ActionBar'
import InputLabel from './InputLabel'
import InfoString from './InfoString'
import InfoStringIn from './InfoStringIn'

const GlobalStyle = createGlobalStyle`

body, html {
  background: ${props => props.theme.background};
  font-family: SFUIDisplay-Regular, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif, "Apple Color Emoji";
  overflow: hidden;
}

a, a:active, a:visited {
  color: #0079FF;
}

`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkMode: false,
      regexActive: false,
      caseSensitive: false,
      wholeWord: false,
      findMode: 2,
      findString: '',
      replaceString: '',
      selection: false,
      replaceStart: false,
      helpActive: false,
    }

    this.timeout

    this.changeMode = this.changeMode.bind(this)
    this.findInputHandleKeyPress = this.findInputHandleKeyPress.bind(this)
    this.replaceInputHandleKeyPress = this.replaceInputHandleKeyPress.bind(this)
    this.findInputHandleOnChange = this.findInputHandleOnChange.bind(this)
    this.replaceInputHandleOnChange = this.replaceInputHandleOnChange.bind(this)

    this.handleRegex = this.handleRegex.bind(this)
    this.handleCaseSensitive = this.handleCaseSensitive.bind(this)
    this.handleWholeWord = this.handleWholeWord.bind(this)

    this.handleSelection = this.handleSelection.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.handleDocument = this.handleDocument.bind(this)

    this.replace = this.replace.bind(this)
    this.toogleHelp = this.toogleHelp.bind(this)
    
  }

  componentDidMount() {
    window.SetSettings = json => {
      this.setState(JSON.parse(json))
    }
    this.findIntput.focus()
  }

  componentWillMount() {
    //document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.body.style.margin = 0
    document.body.style.padding = 0
  }

  componentWillUnmount() {
    //document.removeEventListener('keydown', this.onKeyDown.bind(this));
    document.body.style.margin = null
    document.body.style.padding = 0
  }

  changeMode() {
    const { darkMode } = this.state
    this.setState({
      darkMode: !darkMode
    })
    window.postMessage('setDarkMode', !darkMode)
  }

  handleRegex() {
    const { regexActive } = this.state
    this.setState({
      regexActive: !regexActive
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  handleCaseSensitive() {
    const { caseSensitive } = this.state
    this.setState({
      caseSensitive: !caseSensitive
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  handleWholeWord() {
    const { wholeWord } = this.state
    this.setState({
      wholeWord: !wholeWord
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  handleSelection() {
    if (!this.state.selection) return
    this.setState({
      findMode: 1
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  handlePage() {
    this.setState({
      findMode: 2
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  handleDocument() {
    this.setState({
      findMode: 3
    })
    window.postMessage('find', JSON.stringify(this.state))
  }

  findInputHandleKeyPress(event) {
    if (event.key === 'Enter') {
      this.replaceInput.focus()
    }
  }

  findInputHandleOnChange(event) {
    console.log('findInputHandleOnChange')
    this.setState({
      findString: event.target.value,
      replaceString: this.replaceInput.value
    })
    // window.postMessage('find', JSON.stringify(this.state))
  }

  replaceInputHandleKeyPress(event) {
    if (event.key === 'Enter') {
      this.replace()
    }
  }

  replaceInputHandleOnChange(event) {
    this.setState({
      findString: this.findIntput.value,
      replaceString: event.target.value
    })
    //window.postMessage('find', JSON.stringify(this.state))
  }

  closeWindow() {
    window.postMessage('close')
  }

  toogleHelp() {
    const { helpActive } = this.state
    this.setState({
      helpActive: !helpActive
    })
  }

  replace() {
    this.setState({
      replaceStart: true,
    })
    window.postMessage('replace', JSON.stringify(this.state))
  }

  render() {
    const {
      regexActive,
      darkMode,
      caseSensitive,
      wholeWord,
      findString,
      replaceString,
      findMode,
      count,
      replaceStart,
      selection,
      helpActive,
    } = this.state

    const theme = getTheme(darkMode)

    return (
      <Fragment>
        <ActionBar>
          <BtnGroup>
            <BtnText 
            style={{
              cursor: 'pointer'
            }}
            theme={theme} onClick={this.changeMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </BtnText>
            <BtnText
            theme={theme}
            style={{
               cursor: 'help'
            }}
            onClick={this.toogleHelp}>
              ?
            </BtnText>
          </BtnGroup>
        </ActionBar>
        <Page theme={theme}>
          <RowGroup>
            <Row>
              <InputLabel theme={theme}>FIND</InputLabel>
            </Row>
            <Row>
              <Input
                theme={theme}
                value={findString}
                onKeyPress={this.findInputHandleKeyPress}
                onChange={this.findInputHandleOnChange}
                ref={input => {
                  this.findIntput = input
                }}
                autocomplete={'off'} 
                autocorrect={'off'}
                autocapitalize={'off'}
                spellcheck={'false'}
              />
              <BtnGroup>
                <BtnInage
                  onClick={this.handleRegex}
                  theme={theme}
                  isActive={regexActive}
                >
                  <svg width='38px' height='32px' viewBox='0 0 38 32'>
                    <g
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'
                    >
                      <path
                        d='M14.5,23 C13.6578947,23 13,22.3421053 13,21.5 C13,20.6447368 13.6578947,20 14.5,20 C15.3552632,20 16,20.6447368 16,21.5 C16,22.3421053 15.3552632,23 14.5,23 Z'
                        fill={
                          regexActive
                            ? theme.activeIconColor
                            : theme.inactiveIconColor
                        }
                      />
                      <polygon
                        fill={
                          regexActive
                            ? theme.activeIconColor
                            : theme.inactiveIconColor
                        }
                        points='25.1897507 15.4466403 22.1357341 13.5494071 22.3351801 17 20.6648199 17 20.8642659 13.5375494 17.8102493 15.4466403 17 14.0711462 20.2285319 12.5059289 17 10.9525692 17.8102493 9.55335968 20.8642659 11.486166 20.6648199 8 22.3351801 8 22.1357341 11.486166 25.1897507 9.55335968 26 10.9525692 22.7839335 12.5059289 26 14.0711462'
                      />
                    </g>
                  </svg>
                </BtnInage>
                <BtnInage
                  onClick={this.handleCaseSensitive}
                  theme={theme}
                  isActive={caseSensitive}
                >
                  <svg width='38px' height='32px' viewBox='0 0 38 32'>
                    <g
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'
                    >
                      <path
                        d='M17.9891077,22.7340909 L16.5730921,18.7008878 L10.9676233,18.7008878 L9.55160769,22.7340909 L7.70590456,22.7340909 L12.9012171,8.64229403 L14.6394983,8.64229403 L19.8348108,22.7340909 L17.9891077,22.7340909 Z M13.7410608,10.7809659 L11.4852014,17.2067472 L16.0555139,17.2067472 L13.7996546,10.7809659 L13.7410608,10.7809659 Z M25.7628454,21.4254972 C27.3937048,21.4254972 28.5948767,20.3219815 28.5948767,18.876669 L28.5948767,18.0661222 L25.9679236,18.2321378 C24.4640173,18.3200284 23.6827673,18.876669 23.6827673,19.8434659 C23.6827673,20.7712003 24.4933142,21.4254972 25.7628454,21.4254972 Z M25.3819861,22.8805753 C23.3214392,22.8805753 21.9542517,21.6403409 21.9542517,19.8434659 C21.9542517,18.095419 23.2921423,17.0602628 25.7726111,16.9137784 L28.5948767,16.7477628 L28.5948767,15.907919 C28.5948767,14.657919 27.7745642,13.9743253 26.2999548,13.9743253 C25.1378454,13.9743253 24.2687048,14.5700284 24.0733923,15.517294 L22.4522986,15.517294 C22.5011267,13.7887784 24.1710486,12.4801847 26.3292517,12.4801847 C28.7413611,12.4801847 30.2940954,13.7594815 30.2940954,15.7614347 L30.2940954,22.7340909 L28.6827673,22.7340909 L28.6827673,20.986044 L28.6437048,20.986044 C28.0675329,22.1090909 26.7980017,22.8805753 25.3819861,22.8805753 Z'
                        fill={
                          caseSensitive
                            ? theme.activeIconColor
                            : theme.inactiveIconColor
                        }
                      />
                    </g>
                  </svg>
                </BtnInage>
                <BtnInage
                  onClick={this.handleWholeWord}
                  theme={theme}
                  isActive={wholeWord}
                >
                  <svg width='38px' height='32px' viewBox='0 0 38 32'>
                    <g
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'
                    >
                      <g
                        transform='translate(6.000000, 13.000000)'
                        fill={
                          wholeWord
                            ? theme.activeIconColor
                            : theme.inactiveIconColor
                        }
                      >
                        <rect x='6' y='0' width='14' height='5' />
                        <path d='M7,9 L19,9 L19,7 L20,7 L20,10 L19,10 L7,10 L6,10 L6,7 L7,7 L7,9 Z' />
                        <rect x='3' y='0' width='2' height='5' />
                        <rect x='0' y='0' width='2' height='5' />
                        <rect x='21' y='0' width='2' height='5' />
                        <rect x='24' y='0' width='2' height='5' />
                      </g>
                    </g>
                  </svg>
                </BtnInage>
              </BtnGroup>
            </Row>
          </RowGroup>
          <RowGroup>
            <Row>
              <InputLabel theme={theme}>REPLACE BY</InputLabel>
            </Row>

            <Row>
              <Input
                theme={theme}
                value={replaceString}
                onKeyPress={this.replaceInputHandleKeyPress}
                onChange={this.replaceInputHandleOnChange}
                ref={input => {
                  this.replaceInput = input
                }}
                autocomplete={'off'} 
                autocorrect={'off'}
                autocapitalize={'off'}
                spellcheck={'false'}
              />
              <BtnGroup>
                {  
                  (selection) && <BtnInage
                    onClick={this.handleSelection}
                    theme={theme}
                    isActive={findMode === 1}
                  >
                    <svg width='38px' height='32px' viewBox='0 0 38 32'>
                      <g
                        stroke='none'
                        strokeWidth='1'
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(6.000000, 9.500000)'
                          fill={
                            findMode === 1
                              ? theme.activeIconColor
                              : theme.inactiveIconColor
                          }
                        >
                          <rect x='0' y='0' width='2' height='5' />
                          <rect x='3' y='0' width='2' height='5' />
                          <rect x='6' y='0' width='2' height='5' />
                          <rect x='9' y='0' width='17' height='5' />
                          <rect x='24' y='8' width='2' height='5' />
                          <rect x='21' y='8' width='2' height='5' />
                          <rect x='18' y='8' width='2' height='5' />
                          <rect x='0' y='8' width='17' height='5' />
                        </g>
                      </g>
                    </svg>
                  </BtnInage>
                }
                <BtnInage
                  onClick={this.handlePage}
                  theme={theme}
                  isActive={findMode === 2}
                >
                  <svg width='38px' height='32px' viewBox='0 0 38 32'>
                    <g
                      stroke='none'
                      fill={
                        findMode === 2
                          ? theme.activeIconColor
                          : theme.inactiveIconColor
                      }
                      fillRule='nonzero'
                    >
                      <g>
                        <path d="M13,8 L13,23 L25,23 L25,11.5845676 L21.3777001,8 L13,8 Z M13,6 L21.3777001,6 C21.9045055,6 22.4100372,6.20784934 22.7844901,6.57840166 L26.40679,10.1629693 C26.7864011,10.5386261 27,11.0505052 27,11.5845676 L27,23 C27,24.1045695 26.1045695,25 25,25 L13,25 C11.8954305,25 11,24.1045695 11,23 L11,8 C11,6.8954305 11.8954305,6 13,6 Z"></path>
                      </g>
                    </g>
                  </svg>
                </BtnInage>
                <BtnInage
                  onClick={this.handleDocument}
                  theme={theme}
                  isActive={findMode === 3}
                >
                  <svg width='38px' height='32px' viewBox='0 0 38 32'>
                    <g
                      stroke='none'
                      fill={
                        findMode === 3
                          ? theme.activeIconColor
                          : theme.inactiveIconColor
                      }
                      fillRule='nonzero'
                    >
                      <g>
                        <path d='M11,10 L11,25 L23,25 L23,13.5845676 L19.3777001,10 L11,10 Z M11,8 L19.3777001,8 C19.9045055,8 20.4100372,8.20784934 20.7844901,8.57840166 L24.40679,12.1629693 C24.7864011,12.5386261 25,13.0505052 25,13.5845676 L25,25 C25,26.1045695 24.1045695,27 23,27 L11,27 C9.8954305,27 9,26.1045695 9,25 L9,10 C9,8.8954305 9.8954305,8 11,8 Z' />
                        <path d='M26,24 L26,10.5845676 L22.3777001,7 L12,7 C12,5.8954305 12.8954305,5 14,5 L22.3777001,5 C22.9045055,5 23.4100372,5.20784934 23.7844901,5.57840166 L27.40679,9.16296929 C27.7864011,9.53862612 28,10.0505052 28,10.5845676 L28,22 C28,23.1045695 27.1045695,24 26,24 Z' />
                      </g>
                    </g>
                  </svg>
                </BtnInage>
              </BtnGroup>
            </Row>
          </RowGroup>

          <InfoRowGroup>
            <InfoString theme={theme}>
              Options:
              <InfoStringIn theme={theme}>
                {regexActive ? ' Regex, ' : ' '}
                {caseSensitive ? 'Case Sensitive, ' : 'Case Insensitive, '}
                {wholeWord ? 'Whole Word, ' : ''}
                in the 
                {findMode === 1 && ' Selection'}
                {findMode === 2 && ' Page'}
                {findMode === 3 && ' Document'}
                .
              </InfoStringIn>
            </InfoString>
          </InfoRowGroup>

          <RowGroup>
            <Row>
              <Button onClick={this.closeWindow} theme={theme}>
                Cancel
              </Button>
              <Button onClick={this.replace} primary theme={theme} isActive={!replaceStart}>
                Replace
              </Button>
            </Row>
          </RowGroup>
        </Page>
        <Help isActive={helpActive} theme={theme} close={this.toogleHelp}/>
        <GlobalStyle theme={theme} />
      </Fragment>
    )
  }
}
