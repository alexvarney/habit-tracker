import React from 'react'
import tinycolor from 'tinycolor2'

export default function HabitRowDisplayButton({habitDateObject, habit}) {

  const lighterColor = tinycolor(habit.color).lighten(10).toHex();
  const darkerColor = tinycolor(habit.color).darken(25).toHex();

  let backgroundStyle = (habit.requiresUpdate && habitDateObject.matchFound) ? {background: `linear-gradient(225deg, #${lighterColor} 0%, #${darkerColor} 100%)`,} : {}

  if (!habit.requiresUpdate){
    backgroundStyle = habitDateObject.matchFound ? {} : {background: `linear-gradient(225deg, #${lighterColor} 0%, #${darkerColor} 100%)`,};
  }

  const boxStyle = {
    ...backgroundStyle,
    border: '2px solid #686868',
    boxSizing: 'border-box',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.25)',
    borderRadius: '0.4rem',
    width: '1.2rem',
    height: '1.2rem',
    margin: '0.5rem',
    flexShrink: '0',
  }

  return (
    <div style={boxStyle} />
  )
}
