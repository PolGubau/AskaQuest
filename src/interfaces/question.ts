
export interface Question {
  ID?: number
  creator_id?: number
  title: string
  solution: string
  answers: Object
  date_creation: string | Date
}
