import React from 'react'

const PageIcon =  (props) => {
  const { theme, isActive } = props
  return (
    <svg width='38px' height='32px' viewBox='0 0 38 32'>
      <g
        stroke='none'
        fill={
          isActive
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
  )
}

export default PageIcon


