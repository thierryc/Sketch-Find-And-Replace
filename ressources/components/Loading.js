
import React from 'react'
import styled from 'styled-components'

import LoadingIcon from './svg-icons/LoadingIcon'

const LoadingPage = styled.div`
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

const LoadingContainer = styled.div`
  height: 180px;
  display: flex; /* or inline-flex */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`

const Msg = styled.div`
  text-align: center;
  font-size: 12px;
`



const Loading = (props) => {
  const { 
    isActive,
    theme,
  } = props
  return <LoadingPage 
    isActive={isActive}
    theme={theme}
    >
    <LoadingContainer>
      <LoadingIcon color={theme.activeIconColor}/>
    </LoadingContainer>
    <Msg>Sketch Find and Replace</Msg>
  </LoadingPage>
}
  
export default Loading
