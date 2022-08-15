import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

import { User } from "src/interfaces/User";

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
        const query = `SELECT * FROM public."Collections" WHERE "ID" = $1`;
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
        const { likes } = body;
        const query = `UPDATE public."Collections" SET likes = $1, WHERE ID = $2 RETURNING *`;
        const values = [likes, id];
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
        const query = `DELETE FROM public."Collections" WHERE ID = $1 RETURNING *`;
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
