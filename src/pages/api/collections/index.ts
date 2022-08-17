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
        const { creatorID, likes } = body
        const query = `INSERT INTO public."Collections"( creator_id, likes)
          VALUES (?, ?, ?, ?);`
        const values = [creatorID, likes]
        const responsePOST = await conn.query(query, values)

        return res.status(200).json(responsePOST)
      } catch (error) {
        return res.status(400).json({ error })
      }

    default:
      return res.status(404).json({ error: 'not found' })
  }
}
