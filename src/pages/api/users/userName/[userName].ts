import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import UserInterface  from 'src/interfaces/User'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query,body } = req
  const userNameReq = query.userName

  //
 switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Users" WHERE "userName" = $1'
        const values = [userNameReq]
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
      const content= JSON.parse(body)
      const { userName, email, password,followers,following,collections_done,role,image,ID } = content
      // campos que se pueden variar= userName, email, password,followers,following,collections_done,role,image
      try {
        const query = `UPDATE public."Users" SET 
        "userName" = $1, 
        "email" = $2, 
        "password" = $3, 
        "followers" = $4, 
        "following" = $5, 
        "collections_done" = $6, 
        "role" = $7, 
        "image" = $8, 
        WHERE "ID" = $9
        RETURNING *`
        
        const values = [userName, email, password,followers,following,collections_done,role,image,ID]
        
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
        const query = 'DELETE FROM public."Users" WHERE userName = $1 RETURNING *'
        const values = [userNameReq]

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
