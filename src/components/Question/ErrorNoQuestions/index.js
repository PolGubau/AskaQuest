
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PATH from 'src/utils/consts'
import Swal from 'sweetalert2'

export default function ErrorNoQuestion() {
  const router = useRouter()
  useEffect(() => {
    Swal.fire({
      title: 'Ouppps!',
      text: 'This Collection has no questions',
      icon: 'error',
      confirmButtonText: 'Go Home'
    }).finally(() => {
      router.push(PATH.HOME)
    })
  }, [])

  return (
    <></>
  )
}
