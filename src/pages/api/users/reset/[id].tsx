/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import UserInterface from 'src/interfaces/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query, body } = req
  const paramID = query.id as string
  const id = Number(paramID) || 0

  //
  switch (method) {
    //
    case 'PUT':{
      if (!body) {
        return res.status(400).json({ error: 'Missing body' })
      }
      // take the user from the body and update it
      const { userName, email, password, role, image } = body

      const query = 'UPDATE public."Users" SET "userName" = $1, "email" = $2, "password" = $3, "followers" = $4, "following" = $5, "collections_done" = $6, "role" = $7, "image" = $8, "liked" =$9 WHERE "ID" = $10'

      const values = [userName, email, password, JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), role, image, JSON.stringify([]), id]
      await conn.query(query, values).then((result: { rows: Array<object | UserInterface> }) => {
        return res.json(result)
      })

      break }

    //
    default:
      return res.status(404).json({ error: 'not found' })
  }
}
