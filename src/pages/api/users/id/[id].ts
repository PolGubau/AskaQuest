import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

import { User } from "src/interfaces/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | object>
) {
  const { method, query, body } = req;
  const paramID = query.id;
  let id: Number;
  id = Number(paramID);

  //
  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM public."Users" WHERE "ID" = $1`;
        const values = [id];
        const result = await conn.query(query, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ error });
      }

    //
    case "PUT":
      try {
        const { userName, password } = body;
        const query = `UPDATE public."Users" SET userName = $1, password = $2, WHERE ID = $3 RETURNING *`;
        const values = [userName, password, id];
        const result = await conn.query(query, values);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ error: error });
      }

    //
    case "DELETE":
      try {
        const query = `DELETE FROM public."Users" WHERE ID = $1 RETURNING *`;
        const values = [id];

        const response = await conn.query(query, values);
        return res.json(response);
      } catch (error) {
        return res.status(400).json({ error: error });
      }

    //
    default:
      return res.status(404).json({ error: "not found" });
  }
}
