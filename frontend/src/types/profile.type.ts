import { RegisterBody } from './auth.type'

export type TProfileInput = Omit<
  RegisterBody,
  'password' | 'type' | 'email' | 'address' | 'lastName'
> &
  Partial<Pick<RegisterBody, 'address' | 'lastName'>>

export type TProfileArgs = TProfileInput & { image: string }

export type TProfile = Omit<RegisterBody, 'password'> & {
  id: number
  image: string
}

export type ChangePasswordInput = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type ChangePasswordArgs = Omit<ChangePasswordInput, 'confirmPassword'>
