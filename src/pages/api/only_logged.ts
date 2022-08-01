import type { NextApiRequest, NextApiResponse } from 'next'
import {conn} from 'src/utils/database';
import {getSession} from 'next-auth/react'
type Data = {
  name: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const session = await getSession({req})
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT "ID", date_creation, "userName", password FROM public."Users";'
        const response = await conn.query(query)
        return res.json(response.rows)
      } catch (error) {
        return res.status(400).json({ error: error })
      }

    case 'POST':
      try {
        const { userName, password } = body
        const query = `INSERT INTO public."Users"("userName", password)VALUES ('$1', '$2');`
        const values = [userName, password]
        const responsePOST = await conn.query(query, values)

        return res.status(200).json(responsePOST)
      } catch (error) {
        return res.status(400).json({ error: error })
      }

    default:
      return res.status(404).json({ error: 'not found' })
  }
  res.end()
}