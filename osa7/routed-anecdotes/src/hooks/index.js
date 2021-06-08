import {useState} from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (e) => setValue(e.target.value)

    const reset = () => {
        setValue('')
        
    }

    return {
        name,
        value,
        onChange,
        reset
    }
}


export const useReset = (fields) => {
  const reset = () => {
      fields.forEach(field => field.reset())
  }

  return{
      reset
  }
}