export type MessagesData = {
  sender: Participant
  receiver: Participant
  messages: Message[]
}

type Participant = {
  firstName: string
  lastName: string
  image: string
}

type Message = {
  id: number
  isSender: boolean
  content: string
  createdAt: string
}

export type Contact = {
  userId: number
  firstName: string
  lastName: string
  image: string
}
