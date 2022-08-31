/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'pg'
import { conn } from 'src/utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Collections";'
        const response = await conn.query(query)
        return res.json(response.rows)
      } catch (error) {
        return res.status(400).json({ error: error })
      }
      break;

    case 'POST':
      try {
        const content = JSON.parse(body)
        
        const { creator_id: creatorID, title, tags } = content
        
        const jsonTags = JSON.stringify(tags)
        
        const query = `INSERT INTO public."Collections"( creator_id, date_creation,likes,title,tags)
          VALUES ($1, $2, $3,$4,$5) RETURNING *;`
          
        const values = [creatorID, new Date(), 0, title, jsonTags]
        
        const responsePOST = await conn.query(query, values)
        const collection = responsePOST.rows

        return res.status(200).json({ collection })
      }   catch (error) {
        return res.status(400).json({ error, message: 'error', body })
      }
      break;

    default:
      return res.status(404).json({ error: 'not found' })
            break;

  }
}
