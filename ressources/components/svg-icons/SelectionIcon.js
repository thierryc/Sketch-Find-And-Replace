import React from 'react'

const SelectionIcon =  (props) => {
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
          transform='translate(6.000000, 9.500000)'
          fill={
            isActive
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
  )
}

export default SelectionIcon


