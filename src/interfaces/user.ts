
export interface User {
  ID: string
  date_creation?: string
  userName: string
  password: string
  followers?: Array<number | string>
  following?: Array<number | string>
  email: string
  collections_done?: string
  role: number
  image?: string
}

