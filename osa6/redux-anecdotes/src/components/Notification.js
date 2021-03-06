import React from 'react'
import {connect} from 'react-redux'
const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notification){
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }

  return null
  
}

const connectedNotification = connect(state => state)(Notification)
export default connectedNotification