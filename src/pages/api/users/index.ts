import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";
var bcrypt = require("bcryptjs");

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query =
          'SELECT "ID", date_creation, "userName", password FROM public."Users";';
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error: error });
      }

    case "POST":
      const content = JSON.parse(body);
      try {
        const { userName, email, password } = content;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const query = `INSERT INTO public."Users"(
          "userName", password, email,date_creation)
          VALUES ($1, $2, $3,$4)
            RETURNING *;`;
        const values = [userName, hashPassword, email, new Date()];

        const responsePOST = await conn.query(query, values);

        const user = responsePOST.rows;

        return res.status(200).json({ user, success: true });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
      }

    default:
      return res.status(404).json({ error: "not found" });
  }
}
