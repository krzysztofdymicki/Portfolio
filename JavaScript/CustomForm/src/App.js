import React, { useState, useEffect } from 'react'
import DishForm from './components/DishForm'
import { Container } from 'reactstrap'

import formService from './services/formService'


const App = () => {

  const [test, setTest] = useState([])

  useEffect(() => {
    const data = formService.test()
    setTest(data)
  },[])

  console.log(test)

  return (
    <Container 
              style={{
                      width: '100vw',
                      background: '#E0E0E0',
                      margin: '0 auto',
                      height: '100vh',
                      padding: '2em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
    <DishForm />
    </Container>
  )
}

export default App