import React from 'react'
import './Css/hightLightText.css'
const Highlighttext = ({text}) => {
  return (
    <span className='font-glow-effect font-mono'>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default Highlighttext