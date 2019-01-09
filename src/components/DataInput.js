import React from 'react'

export default function DataInput({handleDataInput}) {
  return (
    <textarea
      rows = "2"
      cols = "30"
      placeholder = "Input data here"
      onChange = {(e) => handleDataInput(e)} 
    />
  )
}
