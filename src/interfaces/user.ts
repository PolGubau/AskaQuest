
export default interface UserInterface {
  ID: string
  date_creation?: string
  userName: string
  password: string
  email: string
  role: number
  image?: string
  followers?: Array<number | string> | any
  following?: Array<number | string> | any
  collections_done?: any
  liked: Array<number | string> 
  error?:any
}

