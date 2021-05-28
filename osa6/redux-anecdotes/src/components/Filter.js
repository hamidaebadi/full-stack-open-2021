import React from 'react'
import {connect} from 'react-redux'
import {setFilter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const content = event.target.value
    props.setFilter(content)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {setFilter})(Filter)