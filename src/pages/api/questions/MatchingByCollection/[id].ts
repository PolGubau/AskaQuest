import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { method, query, body } = req;
  const paramID = query.id;
  let id: Number; // we get the ID from the collection that this question belongs to
  id = Number(paramID);

  //
  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM public."Questions" WHERE "collection_id" = $1`;
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
        const query = `UPDATE public."Questions" SET likes = $1, WHERE collection_id = $2 RETURNING *`;
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
        const query = `DELETE FROM public."Questions" WHERE ID = $1 RETURNING *`;
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
