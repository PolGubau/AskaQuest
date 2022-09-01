/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Questions";'
        const response = await conn.query(query)
        return res.json(response.rows)
      } catch (error) {
        return res.status(400).json({ error })
      }

    case 'POST':
      try {
        const { collection_id: collectionID, title, solution, answers, creator_id: creatorID } = JSON.parse(body)
        const answerJson = JSON.stringify(answers)

        const query = 'INSERT INTO public."Questions" ("collection_id","title","solution","date_creation","answers","creatorID") VALUES ($1, $2, $3, $4, $5, $6);'
        const values = [collectionID, title, solution, new Date(), answerJson, creatorID]
        console.log('RECEIVED FROM BACK: ', values)
        const response = await conn.query(query, values)

        return res.status(201).json({ response, message: 'Question created' })
      } catch (error) {
        return res.status(400).json({ error })
      }

    default:
      return res.status(404).json({ error: 'method not found' })
  }
}
