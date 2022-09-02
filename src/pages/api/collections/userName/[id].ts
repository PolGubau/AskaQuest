/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req
  const userName = query.id
  switch (method) {
    case 'GET':
      try {
        const getIdByUsername =
          'SELECT "ID" FROM public."Users" WHERE "userName" = $1;'
        const valuesUserName = [userName]
        const responseId = await conn.query(getIdByUsername, valuesUserName)
        const idmatched = responseId.rows[0].ID

        const query =
          'SELECT * FROM public."Collections" WHERE "creator_id" = $1;'
        const values = [idmatched]
        const response = await conn.query(query, values)
        return res.json(response.rows)
      } catch (error) {
        return res.status(400).json({ error })
      }

    default:
      return res.status(404).json({ error: 'not found' })
  }
}
