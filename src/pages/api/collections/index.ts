/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
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
        return res.status(400).json({ error })
      }

    case 'POST':
      try {
        const content = JSON.parse(body)

        const { creator_id: creatorID, likes, title, tags } = content
        const query = `INSERT INTO public."Collections"( creator_id, date_creation,likes,title,tags)
          VALUES (?, ?, ?, ?,?);`
        const values = [creatorID, new Date(), likes, title, tags]
        const responsePOST = await conn.query(query, values)

        return res.status(200).json(responsePOST)
      } catch (error) {
        return res.status(400).json({ error })
      }

    default:
      return res.status(404).json({ error: 'not found' })
  }
}
