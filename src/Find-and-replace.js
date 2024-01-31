import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote'
import pack from '../package.json'

// documentation: https://developer.sketchapp.com/reference/api/

// defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
// defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool NO

// touch ~/Library/Logs/com.bohemiancoding.sketch3/Plugin\ Log.log
// tail -F ~/Library/Logs/com.bohemiancoding.sketch3/Plugin\ Log.log

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

const { UI, Settings, Document } = sketch

const PREFUNIQUKEY = 'cx.ap.sketch-find-and-replace.pref'
const SATEUNIQUKEY = 'cx.ap.sketch-find-and-replace.state'

// to delete saved settings uncoment the next line
// Settings.setSettingForKey(PREFUNIQUKEY, JSON.stringify({}))

const defaultSettings = {
  findString: '',
  replaceString: '',
  document: false,
  regexActive: false,
  caseSensitive: false,
  wholeWord: false,
  count: 0,
}

// Clean find input so it's suitable for use in the regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

function escapeReplaceString(string) {
  return string
}

// wholeword: (?:^|\b)(Occupation)(?=\b|\$)
// no wholeword: (Occupation)

// exact match ^(Occupation)$

// start ^(Occupation)
// end (Occupation)$

const debounce = (fn, time) => {
  let timeout

  return function() {
    const functionCall = () => fn.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}


export default function() {
  let theme = ''
  if (UI && UI.getTheme) {
    theme = UI.getTheme()
  }
  if (theme === 'dark') {
    defaultSettings.darkMode = true
  } else {
    defaultSettings.darkMode = false
  }

  // load state
  const savedSate = Settings.settingForKey(SATEUNIQUKEY)
  let state = Object.assign({}, defaultSettings)

  if (
    typeof savedSate === 'string'
    && savedSate == 'Loaded'
  ) {
    Settings.setSettingForKey(SATEUNIQUKEY, '')
    // load pref
    const savedSettings = Settings.settingForKey(PREFUNIQUKEY)
    if (
      typeof savedSettings === 'string' 
      && typeof JSON.parse(savedSettings) === 'object'
    ) {
      state = Object.assign({}, defaultSettings, JSON.parse(savedSettings))
    } else {
      Settings.setSettingForKey(PREFUNIQUKEY, JSON.stringify({}))
    }
  }

  Settings.setSettingForKey(SATEUNIQUKEY, 'Loaded')

  let layers = []
  let overrides = []

  const document = Document.getSelectedDocument()

  let selection = null

  if (document) {
    selection = document.selectedLayers
    if (selection.length > 0) {
      UI.message('Find and replace in the selection (v' + pack.version + ')')
      state = Object.assign({}, state, { findMode: 1, selection: true })
    } else {
      UI.message('Find and replace in the current page (v' + pack.version + ')')
      const page = document.selectedPage
      selection = page.layers
      state = Object.assign({}, state, { findMode: 2, selection: false })
    }
  }

  const saveSettings = (obj) => {
    const str = JSON.stringify(obj, null, 1)
    Settings.setSettingForKey(PREFUNIQUKEY, str)
  }


  const windowOptions = {
    identifier: 'cx.ap.sketch-find-and-replace.webWiew',
    width: 460,
    height: 240,
    resizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    title: 'Find and Replace V2',
    acceptFirstMouse: true,
    minimizable: false,
    maximizable: false
  }

  let browserWindow = new BrowserWindow(windowOptions)

  browserWindow.on('closed', () => {
    browserWindow = null
  })

  browserWindow.loadURL(require('../ressources/index.html'))

  let contents = browserWindow.webContents

  const initRegExp = (newState) => {
    state = newState
    UI.message(`${state.findString} replace by ${state.replaceString}`)
    // reset layers
    layers = []
    // reset overrides 
    overrides = []
    // wholeWord
    const rexExpFlag = `g${(state.caseSensitive == true) ? '': 'i'}`
    const regExpPrefix = state.wholeWord ? '(?:\\^|\\b)' : ''
    const regExpSufix = state.wholeWord ? '(?=\\b|\\$)' : ''
    const regExpPattern = (state.regexActive) 
      ? `${regExpPrefix}${state.findString}${regExpSufix}`
      : `${regExpPrefix}(?:${escapeRegExp(state.findString)})${regExpSufix}`
    const regex = new RegExp(regExpPattern, rexExpFlag)

    const { findMode } = state
    // log('--------------------------------')
    // log('findMode: ' + findMode)

    switch(findMode){
    case 1:
      if (document && document.selectedLayers.length > 0) {
        selection = document.selectedLayers
      }
      break
    case 3:
      selection = document.pages
      // log(JSON.stringify(document.selectedPage,null,1))
      break
    default:
      selection = document.selectedPage.layers
    }
    state = Object.assign({}, state, { 
      regex: regex
    })
    parseLayers(selection, regex)
    const count = layers.length + overrides.length
    state = Object.assign({}, state, { count })
    // send count
    // log(JSON.stringify(state,null,2))
    updateSateWebview()
  }

  const replaceInLayer = (layer) => {
    const newStringValue = layer.text.replace(state.regex, escapeReplaceString(state.replaceString))
    layer.text = newStringValue
    if (layer.text != newStringValue) {
      layers.push(layer)
    }
  }

  const replaceInOverride = (override) => {
    const newStringValue = override.value.replace(state.regex, escapeReplaceString(state.replaceString))
    override.value = newStringValue
    if (override.value != newStringValue) {
      overrides.push(override)
    }
  }

  const updateSateWebview = (init) => {
    if (init) {
      state = Object.assign({}, state, { init })
    }
    if (isWebviewPresent(windowOptions.identifier)) {
      let base64EncodedState = Buffer.from(encodeURIComponent(JSON.stringify(state))).toString("base64")
      sendToWebview(
        windowOptions.identifier,
        `updateData('${base64EncodedState}')`
      )
    }
    state = Object.assign({}, state, { init: false })
  }

  const layerTextMatch = () => {
    //state.findString
    return true
  }

  const parseLayers = (layers) => {
    const { findMode } = state
    // log(JSON.stringify(layers, null, 1))
    // recursive function
    layers.forEach(layer => {
      
      switch(layer.type){
      case 'Artboard':
        if (layer.layers && layer.layers.length > 0) {
          parseLayers(layer.layers)
        }
        break
  
      case 'Group':
        // log('Group')
        if (layer.layers) {
          parseLayers(layer.layers)
        }
        break
  
      case 'Text':
        // log('Text')
        if(layerTextMatch(layer)) {
          replaceInLayer(layer)
        }
        //layer.text = 'toto'
        break
  
      case 'ShapePath':
        // log('ShapePath')
        break

      case 'Shape':
        // log('Shape')
        break
      
      case 'SymbolMaster':
        // log('SymbolMaster ' + document.selectedPage.name + ' ' + (findMode === 1))
        if (findMode === 1 || document.selectedPage.name === 'Symbols') {
          parseLayers(layer.layers)
        }
        break
      
      case 'SymbolInstance':
        // log('SymbolInstance')
        parseOverrides(layer.overrides)
        break
  
      case 'Image':
        break
        
      default:
        if (layer.layers) {
          parseLayers(layer.layers)
        }
      }
    })
  }

  const parseOverrides = (overrides) => {
    overrides.forEach(override => {
      // log('--- override ---')
      switch(override.affectedLayer.type) {
      case 'Text':
        // log('-Text')
        if (override.editable && override.property == 'stringValue'){
          replaceInOverride(override)
        }
        break
      
      case 'SymbolInstance':
        // log('-SymbolInstance')
        break
      
      case 'ShapePath':
        // log('-ShapePath')
        // log(override.value)
        break
      
      case 'Shape':
        // log('-Shape')
        // log(override.value)
        break

      case 'Image':
        // log('-Image')
        break
        
      default:
        // log('#####--- Default override type: ' + override.affectedLayer.type)
        /* 
        if (override.layers) {
          parseLayers(override.layers)
        }
        */
      }
    })
  }

  contents.once('did-finish-load', () => {
    updateSateWebview(true)
  })

  contents.once('close', () => {
    browserWindow.close()
  })

  contents.on('message', s => {
    UI.message(s)
  })

  contents.on('resetPref', () => {
    Settings.setSettingForKey(SATEUNIQUKEY, '')
    Settings.setSettingForKey(PREFUNIQUKEY, JSON.stringify({}))
    UI.message(`Reset Preference Settings 🖖! Done`)
  })

  contents.on('setDarkMode', mode => {
    state = Object.assign({}, state, { darkMode: mode })
    saveSettings(state)
    UI.message(`Set darkMode ${mode ? 'on 🌙' : 'off 😎'}!`)
  })

  contents.on('find', debounce(json => {
    const newState = Object.assign({}, JSON.parse(json))
    if (newState.findString != state.findString) {
      //initRegExp(newState)
    }
  }, 100))

  contents.on('replace', debounce(json => {
    const newState = Object.assign({}, JSON.parse(json))
    initRegExp(newState)
    saveSettings(state)
    browserWindow.close()
  }, 100))

  contents.on('selection', debounce(json => {
    state = Object.assign({}, JSON.parse(json))
    const { findMode } = state
    if (document) {
      selection = document.selectedLayers
      if (selection.length > 0 && findMode == 1) {
        UI.message('Find and replace in the selection')
        state = Object.assign({}, state, { findMode: 1, selection: true })
      } else {
        UI.message('Find and replace in the current page')
        const page = document.selectedPage
        selection = page.layers
        state = Object.assign({}, state, { findMode: 2, selection: false })
      }
    }
    saveSettings(state)
    updateSateWebview(false)
  }, 100))

  /*

  browserWindow.webContents
    .executeJavaScript(`updateData(${JSON.stringify(state)})`)
    .then(res => {
      // do something with the result
    });

    browserWindow.webContents
    .executeJavaScript(`updateData(${JSON.stringify(state)})`)
    .then(res => {
      // do something with the result
    });

    const document = sketch.getSelectedDocument();
  if (document) {
    const page = document.selectedPage;
    const selection = document.selectedLayers;
    let layers;
    if (selection.length > 0) {
      UI.message('Find and replace in the selection');
      layers = selection;
    } else {
      UI.message('Find and replace in the current page');
      layers = page.layers;
    }
  }
  //UI.message("It's alive 🙌")
  */
}
