
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query, body } = req
  const paramID = query.id as string
  const id = Number(paramID) || 0

  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Users" WHERE "ID" = $1'
        const values = [id]
