
export interface Question {
  ID?: number
  creator_id?: number
  title: string
  solution: string
  answers: {
    Answer1: string
    Answer2: string
    Answer3: string
  }
  date_creation: string | Date
}
