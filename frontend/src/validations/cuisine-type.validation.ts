import * as yup from 'yup'

export const cuisineTypeValidation = yup.object().shape({
  cuisineName: yup.string().required('Cuisine name is required'),
  description: yup.string().required('Description is required'),
})
