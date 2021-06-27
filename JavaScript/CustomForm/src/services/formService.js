import axios from 'axios'

const baseURL = 'https://frosty-wood-6558.getsandbox.com:443/dishes'

const testURL = 'https://jsonplaceholder.typicode.com/users'


const submit = (formData) => {


  const basicData = {
    name: formData.name,
    preparation_time: formData.preparation_time,
    type: formData.type
  }

  switch(formData.type) {
    case 'pizza' :
      return formData = {
        ...basicData,
        no_of_slices: formData.no_of_slices,
        diameter: formData.diameter
      }
    case 'sandwich' :
      return formData = {
        ...basicData,
        slices_of_bread: formData.slices_of_bread
      }
    case 'soup' :
      return formData = {
        ...basicData,
        spiciness_scale: formData.spiciness_scale
      }
    default: formData = null
  }

  const response = axios
                        .post(baseURL, formData)
                        .then( response => {
                          return response.data
                        }).catch(error => {
                          console.log(error)
                        })
  return response
}

const test = () => {
  const result = axios
                      .get(testURL)
                      .then(response => {
                        console.log(response)
                        console.log(response.data)
                        return response.data
                      })
  return result
}

export default { submit, test }