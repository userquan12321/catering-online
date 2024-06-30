import * as yup from 'yup'

export const loginValidation = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must have at least 8 characters')
    .required('Password is required'),
})
