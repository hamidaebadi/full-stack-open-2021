import React from 'react'
const Header = ({title, id}) => {
    return(
      <>
      <h1 key={id}>{title}</h1>
      </>
    )
  }
  
  const Part = ({name, exercises}) =>{
    return(
      <>
      <p>{name} {exercises}</p>
      </>
    )
  }
  const Total = ({parts}) => {
    const total = parts.reduce((accu, currentValue) => accu + currentValue.exercises, 0)
    return(
      <>
      <h3>Total of {total} exercises</h3>
      </>
    )
  }
  const Content = ({parts}) =>{
    return(
      <>
      {
        parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
      }
      <Total parts={parts} />
      </>
    )
  }
  const Course = ({course}) =>{
    return (
      <>
      <Header title={course.name} id={course.id}/>
      <Content parts={course.parts}/>
      </>
    )
  }

  export default Course