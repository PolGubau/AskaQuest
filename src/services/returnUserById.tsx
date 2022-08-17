import { PATH } from 'src/utils/consts'
import useSWR from 'swr'

const getData = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}
export default function returnUserById (creatorId: string) {
  const userIdEndPoint = `${PATH.API_USER_BY_ID}/${creatorId}`
  const { data: user } = useSWR(userIdEndPoint, getData)

  return user
}
