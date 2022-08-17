/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PATH } from 'src/utils/consts'
import useSWR from 'swr'

const getData = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}
export default function returnUserById () {
  const userIdEndPoint = `${PATH.API_ALL_COLLECTIONS}`
  const { data } = useSWR(userIdEndPoint, getData)
  let randomData
  if (data) {
    console.log(data)
    randomData = data[Math.floor(Math.random() * data.length)]

    console.log('Data:', randomData)
  } else {
    randomData = 'loading'
  }

  return randomData.ID
}
