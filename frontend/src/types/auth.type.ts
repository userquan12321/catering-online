export type RegisterBody = {
  type: number
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
}

export type LoginBody = Pick<RegisterBody, 'email' | 'password'>
