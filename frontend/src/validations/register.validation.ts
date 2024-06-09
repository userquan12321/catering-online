import * as yup from 'yup'

export const registerValidation = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username is too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must have at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
})
