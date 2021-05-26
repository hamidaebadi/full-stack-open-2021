import React from 'react'
const Notification = ({ message }) => {
  const errorStyle = {
    background: '#c51244 !important',
    padding: '10px !important',
    color: 'red',
    fontSize: '20px'
  }
  if (message === null) {
    return null
  }
  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification