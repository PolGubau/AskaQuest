import Image from 'next/image'
import styles from './userHeader.module.css'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import PATH from 'src/utils/path'
import UserInterface from 'src/interfaces/user'
import useFetch from 'react-fetch-hook'
import SquareLoader from '../loaders/SquaresLoader/SquareLoader'
import { useRouter } from 'next/router'

export default function UserHeader ({
  searchById = { state: false, id: '' },
  you = false,
  size = 40,
  name = 'Anonymous',
  image = 'https://api.multiavatar.com/Anonymous.svg'
}: {
  searchById: { state: boolean, id: string }
  you: boolean
  size: number
  name: string
  image: string
}) {
  const router = useRouter()
  let error: boolean = false
  let loading = false
  if (you) {
    const {
      con: { data }
    }: any = getUserFromLocalStorage()
    name = data?.userName
    image = data?.image
  }

  if (searchById.state) {
    const { isLoading, data }: { isLoading: boolean, data?: UserInterface } =
      useFetch(`${PATH.API.USER_BY_ID}/${searchById.id}`)

    if (isLoading) {
      loading = true
    }
    if (data != null) {
      name = data.userName
      image = data.image ?? `https://api.multiavatar.com/${name}.svg`
    } else {
      error = true
      name = 'Deleted User'
      image = 'https://api.multiavatar.com/Deleted.svg'
    }
  }
  const handleLink = (e: { preventDefault: () => any }) => {
    !error && e.preventDefault(); router.push(`/profile/${name}`); loading = true
  }
  return (
    <>
      <header className={styles.container} onClick={handleLink}>
          <a className={styles.creator} style={{ height: size }}>
            {loading
              ? (
              <SquareLoader />
                )
              : (
              <>
                <Image
                  className={styles.creatorImage}
                  src={
                    image ||
                    `https://api.multiavatar.com/${name}.svg` ||
                    'https://api.multiavatar.com/Annonymous.svg'
                  }
                  alt="Creator avatar"
                  width={size - 10}
                  height={size - 10}
                />
                <span className={styles.creatorUserName}>{name}</span>
              </>
                )}
          </a>
      </header>
    </>
  )
}
