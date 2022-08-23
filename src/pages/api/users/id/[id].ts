/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import { User } from 'src/interfaces/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | object>
) {
  const { method, query, body } = req
  const paramID = query.id
  const id = Number(paramID)

  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Users" WHERE "ID" = $1'
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
    // take the user from the body and update it   
      try {
        const { userName, email, password, followers, following, collections_done, role, image, ID } = body
        console.log('BODY received by backend: ', body)
        const query = 'UPDATE public."Users" SET "userName" = $1, "email" = $2, "password" = $3, "followers" = $4, "following" = $5, "collections_done" = $6, "role" = $7, "image" = $8 WHERE "ID" = $9'
        const values = [userName, email, password,JSON.stringify([3,3,5]) ,JSON.stringify([23,5,1]), collections_done, role, image, ID]
        await conn.query(query, values).then((result: { rows: (object | User)[] }) => {
          return res.status(200).json(result)
        })
      } catch (error) {
        return res.status(400).json({ error })
      }
     
      
      
     

    //
    case 'DELETE':
      try {
        const query = 'DELETE FROM public."Users" WHERE ID = $1 RETURNING *'
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
