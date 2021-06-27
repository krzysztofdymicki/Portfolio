import React from 'react'
import { FormGroup, Label, Input, Col } from 'reactstrap'

const renderDetails = ( type, no_of_slices, diameter, spiciness_scale, slices_of_bread, handleChange) => {

  switch(type) {
    case 'sandwich':
      return (
        <FormGroup>
        <Label for='slices_of_bread' sm={2}>Slices of bread</Label>
        <Col >
        <Input 
               required={type === 'sandwich' ? true  : false}
               id='slices_of_bread'
               name='slices_of_bread'
               value={slices_of_bread}
               type='number'
               onChange={handleChange}/>
        </Col>
        </FormGroup>
      )
    case 'pizza':
      return (
        <>
        <FormGroup>
        <Label for='no_of_slices' sm={6}>Slices of pizza</Label>
        <Col >
        <Input 
              required={type === 'pizza' ? true : false }
              id='no_of_slices'
              name='no_of_slices'
              value={no_of_slices}
              type='number'
              onChange={handleChange}/>
        </Col>
        </FormGroup>

        <FormGroup>
        <Label for='diameter' sm={2}>Diameter</Label>
        <Col >
        <Input
              required={type === 'pizza' ? true : false}
              id='diameter'
              onChange={handleChange}
              name='diameter'
              value={diameter}
              type='number'
              step='any' />
        </Col>
        </FormGroup>
        </>
      )
    case 'soup' :
      return (
        <FormGroup>
        <Label for='spiciness_scale' sm={6}>Spiciness of the soup</Label>
        <Col >
        <Input
               required={type === 'soup' ? true : false }
               id='spiciness_scale'
               onChange={handleChange}
               type='range'
               min='0'
               max='10'
               step='1'
               name='spiciness_scale' value={spiciness_scale} /> {spiciness_scale}
        </Col>
        </FormGroup>
      )
    default : null
  }
}

export default renderDetails