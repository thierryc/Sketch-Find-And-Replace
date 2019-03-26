import React from 'react'

const RegexIcon =  (props) => {
  const { theme, isActive } = props
  return (
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
            isActive
              ? theme.activeIconColor
              : theme.inactiveIconColor
          }
        />
        <polygon
          fill={
            isActive
              ? theme.activeIconColor
              : theme.inactiveIconColor
          }
          points='25.1897507 15.4466403 22.1357341 13.5494071 22.3351801 17 20.6648199 17 20.8642659 13.5375494 17.8102493 15.4466403 17 14.0711462 20.2285319 12.5059289 17 10.9525692 17.8102493 9.55335968 20.8642659 11.486166 20.6648199 8 22.3351801 8 22.1357341 11.486166 25.1897507 9.55335968 26 10.9525692 22.7839335 12.5059289 26 14.0711462'
        />
      </g>
    </svg>
  )
}

export default RegexIcon



