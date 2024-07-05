import { RegisterBody } from './auth.type'

export type TProfileInput = Omit<RegisterBody, 'password' | 'type'> & {
  image: string
}

export type TProfile = Omit<RegisterBody, 'password'> & {
  id: number
  image: string
}

export type ChangePasswordInput = {
  oldPassword: string
  password: string
  confirmPassword: string
}

export type ChangePasswordArgs = {
  id: number
  data: Omit<ChangePasswordInput, 'confirmPassword'>
}
