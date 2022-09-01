
export interface QuestionInterface {
  ID?: number | string
  creator_id?: number
  title: string
  solution: string
  answers: Object
  likes: number
  date_creation: string | Date

}
