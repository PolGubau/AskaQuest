
export interface UserInterface {
  ID: string
  date_creation?: string
  userName: string
  password: string
  followers?: Array<number | string> | any
  following?: Array<number | string> | any
  email: string
  collections_done?: string
  role: number
  image?: string
}

