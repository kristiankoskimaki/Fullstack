import React from 'react'

const Course = (props) => {

  const coursesArray = props.courseParam
  const allCourses = coursesArray.map( (someCourse, index) => {
    return (
      <div key={index}>
        <Header courseName = {someCourse.name} key = {someCourse.id}/>
        <Content halfStackCourse = {someCourse} key = {someCourse.parts.id}/>
        <Total allParts= {someCourse.parts}/>
        </div>
    )
  })

  return (
    <div>
      <h1>Web development curriculum</h1>
      {allCourses}
    </div>
  )
}

const Header = (props) => {
  return (
      <h2> {props.courseName} </h2>
  )
}

const Content = (props) => {
  //array of course parts, this will be iterated over
  const courseParts  = props.halfStackCourse.parts

  const allParts = courseParts.map( (coursePart, index) => {
    return <Part name = {coursePart.name} exercises = {coursePart.exercises} key={coursePart.id}/>
  })

  return (<>{allParts}</>)
}

const Part = (props) => {
  return (
      <p>
        {props.name} {props.exercises}
      </p>
  )
}

const Total = (props) => {
  const totalExercises = props.allParts.reduce((sum, value) => sum = sum + value.exercises, 0)
  return <b>total of {totalExercises} exercises</b>
}

export default Course