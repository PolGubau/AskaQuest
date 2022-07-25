import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

import { User } from "src/interfaces/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | object>
) {
  const { method, query } = req;
  const userName = query.userName;

  //
  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM public."Users" WHERE "userName" = $1`;
        const values = [userName];
        const result = await conn.query(query, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "This user doen't exist." });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ error });
      }

    //
    default:
      return res.status(404).json({ error: "not found" });
  }
}
