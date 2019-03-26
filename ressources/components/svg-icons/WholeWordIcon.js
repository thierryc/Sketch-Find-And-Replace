import React from 'react'

const WholeWordIcon =  (props) => {
  const { theme, isActive } = props
  return (
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
            isActive
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
  )
}

export default WholeWordIcon


