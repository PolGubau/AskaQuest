
export interface Question{
    ID?:number,
    creator_id:number,
    title:string,
    answers:string,
    solution:string,
    date_creation:string | Date,
}