import React from 'react'
import styled from 'styled-components'

const GtagContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

const Gtag = () => {
  return <GtagContainer>
    <img 
      style={{ opacity: 0.1 }} 
      src="https://www.google-analytics.com/collect?v=1&tid=UA-37385154-1&cid=555&aip=1&t=event&ec=plugin&ea=help&dp=%2FFindAndReplace&dt=FindAndReplace"
    />
  </GtagContainer>
}

export default Gtag