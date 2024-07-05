import * as yup from 'yup'

export const profileValidation = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  address: yup.string(),
})
