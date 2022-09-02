/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { method, query } = req
  const paramID = query.id
  // we get the ID from the collection that this question belongs to
  const id = Number(paramID)

  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Questions" WHERE "collection_id" = $1'
        const values = [id]

        const result = await conn.query(query, values)
        return res.status(200).json(result)
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    default:
      return res.status(404).json({ error: 'method not found' })
  }
}
