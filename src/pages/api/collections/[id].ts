/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import UserInterface  from 'src/interfaces/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query, body } = req
  const paramID = query.id
  const id = Number(paramID)

  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Collections" WHERE "ID" = $1'
        const values = [id]
        const result = await conn.query(query, values)

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'not found' })
        }
        return res.json(result.rows[0])
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    case 'PUT':
      try {
        const { title,tags,likes,ID } = body
        const query = 'UPDATE public."Collections" SET "title" = $1, "tags"=$2,"likes"=$3 WHERE ID = $4 RETURNING *'
        const values = [ title,JSON.stringify(tags),likes,ID]
        
        const result = await conn.query(query, values)
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'not found' })
        }
        return res.json(result.rows[0])
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    case 'DELETE':
      try {
        const query = 'DELETE FROM public."Collections" WHERE ID = $1 RETURNING *'
        const values = [id]

        const response = await conn.query(query, values)
        return res.json(response)
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    default:
      return res.status(404).json({ error: 'not found' })
  }
}
