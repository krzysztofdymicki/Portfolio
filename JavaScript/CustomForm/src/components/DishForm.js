import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'

import renderDetails from '../helpers/renderDetails'
import { change, reset } from '../reducers/formReducer'
import formService from '../services/formService'
import Notification from './Notification.js'
import { setNotification } from '../reducers/NotificationReducer'


const DishForm = () => {

  // HOOKS

  const dispatch = useDispatch()
  const form = useSelector(({ form }) => form )
  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread
  } = form

  const notification = useSelector(({ notification }) => notification)

  // HANDLERS

  const handleChange = ({ target }) => {
    console.log(target.value)
    let obj = {}
    Object.defineProperty(obj, target.name, { value: target.value, enumerable: true })
    dispatch(change(obj))
  }

  const handleSubmit =  (event) => {
    event.preventDefault()
    const result = formService.submit(form)
    dispatch(reset())
    dispatch(setNotification({content: 'Form submitted', type: 'success'}))
  }

  // FORM

  return (
    <Form
         style={{width: '40%',
                 padding: '2em',
                 background: 'white',
                 padding: '1.5em 1em',
                 borderRadius: '1em'}}
         onSubmit={handleSubmit}>
        
      <Notification notification={notification} />
      <FormGroup className='justify-content-center'>
      <Label  for='name'>Dish name</Label>
      <Col >
      <Input name='name'
             id='name'
             onChange={handleChange}
             value={name}
             type='text'
             required/>
      </Col>
      </FormGroup>

      <FormGroup>
      <Label  for='preparation_time'>Preparation time</Label>
      <Col >
      <Input name='preparation_time'
             id='preparation_time'
             onChange={handleChange}
             value={preparation_time}
             type='number'
             required/>
      </Col>
      </FormGroup>
      

      <FormGroup>
      <Label  for='type'>Select dish type</Label>
      <Col >
      <Input
             required
             defaultValue={'DEFAULT'}
             type='select'
             name='type'
             id='type'
             onChange={handleChange}>
        <option value='DEFAULT' disabled>Select dish type</option>
        <option value='pizza'>Pizza</option>
        <option value='soup'>Soup</option>
        <option value='sandwich'>Sandwich</option>
      </Input>
      </Col>
      </FormGroup>

      {renderDetails(type, no_of_slices, diameter, spiciness_scale, slices_of_bread, handleChange)}
      
      <Button
             type='submit'
             style={
               {marginTop: '1em'}
             }>Submit</Button>
      
    </Form>
  )
}

export default DishForm