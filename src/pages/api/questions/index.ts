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
        const content = JSON.parse(body)
        const { collection_id: collectionID, title, solution, answers, creator_id: creatorID } = content

        const query = `INSERT INTO public."Questions"( collection_id, title,solution,date_creation,answers,creatorID)
          VALUES ($1, $2, $3,$4,$5,$6) RETURNING *;`

        const values = [collectionID, title, solution, new Date(), answers, creatorID]
        console.log(content)

        const responsePOST = await conn.query(query, values)
        const question = responsePOST.rows
        return res.status(200).json({ question })
      } catch (error) {
        return res.status(400).json({ error, message: 'error' })
      }

    default:
      return res.status(404).json({ error: 'not found' })
  }
}
