import * as yup from 'yup'

export const cateringValidation = yup.object().shape({
  name: yup.string().required('Catering name is required'),
  cuisineId: yup.number().required('Please select a cuisine'),
  price: yup
    .number()
    .min(0, 'Price cannot be smaller than 0')
    .required('Price is required'),
  servesCount: yup
    .number()
    .min(1, 'Serves count cannot be smaller than 1')
    .required('Serves count is required'),
  description: yup.string(),
  image: yup.string(),
})
