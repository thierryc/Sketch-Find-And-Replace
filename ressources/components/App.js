import React, { Fragment } from 'react'
import { getTheme } from './Colors'
import Help from './Help'
import Loading from './Loading'

import GlobalStyle from './GlobalStyle'

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

import RegexIcon from './svg-icons/RegexIcon'
import CaseSensitiveIcon from './svg-icons/CaseSensitiveIcon'
import WholeWordIcon from './svg-icons/WholeWordIcon'

import SelectionIcon from './svg-icons/SelectionIcon'
import PageIcon from './svg-icons/PageIcon'
import DocumentIcon from './svg-icons/DocumentIcon'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkMode: false,
      regexActive: false,
      caseSensitive: false,
      wholeWord: true,
      findMode: 2,
      findString: '',
      replaceString: '',
      selection: false,
      replaceStart: false,
      helpActive: false,
      mounted: false,
    }

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
      this.findIntput.focus()
      this.setState({
        mounted: true
      })
    }
    
    setTimeout(() => {
      this.findIntput.focus()
      this.setState({
        mounted: true
      })
    }, 5000)
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
    this.setState({
      findString: event.target.value,
      replaceString: this.replaceInput.value.split('\\').join('')
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
      replaceString: event.target.value.split('\\').join(''),
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
      replaceStart,
      selection,
      helpActive,
      mounted,
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
                  <RegexIcon theme={theme} isActive={regexActive}/>
                </BtnInage>
                <BtnInage
                  onClick={this.handleCaseSensitive}
                  theme={theme}
                  isActive={caseSensitive}
                >
                  <CaseSensitiveIcon theme={theme} isActive={caseSensitive}/>
                </BtnInage>
                <BtnInage
                  onClick={this.handleWholeWord}
                  theme={theme}
                  isActive={wholeWord}
                >
                  <WholeWordIcon theme={theme} isActive={wholeWord}/>
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
                    <SelectionIcon theme={theme} isActive={findMode === 1}/>
                  </BtnInage>
                }
                <BtnInage
                  onClick={this.handlePage}
                  theme={theme}
                  isActive={findMode === 2}
                >
                  <PageIcon theme={theme} isActive={findMode === 2}/>
                </BtnInage>
                <BtnInage
                  onClick={this.handleDocument}
                  theme={theme}
                  isActive={findMode === 3}
                >
                  <DocumentIcon theme={theme} isActive={findMode === 3}/>
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
        <Loading isActive={replaceStart || !mounted} theme={theme}/>
        <GlobalStyle theme={theme} />
      </Fragment>
    )
  }
}
