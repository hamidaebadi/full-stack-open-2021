import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible? 'none': '' }
  const showWhenVisible = { display: visible? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
    <div>
      <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} id='showBlogForm'>{props.buttonLable}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <br />
          <button onClick={toggleVisibility}> cancle</button>
        </div>
    </div>
        )
}

export default Togglable