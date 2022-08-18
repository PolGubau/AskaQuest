import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './userHeader.module.css'
import useSessionStorage from 'src/hooks/useSessionStorage'

export default function UserHeader({
  you = false,
  size = 40,
  username = 'Anonymous',
  userimage = 'https://api.multiavatar.com/Anonymous.svg'
}) {
  const { con: { data } } = useSessionStorage()
  const name = you ? data.userName : username
  const image = you ? data.image || `https://api.multiavatar.com/${name}.svg` : userimage
  return (
    <>
      <header className={styles.container}>
        <Link href={`/profile/${name}`}>
          <a className={styles.creator} style={{ height: size }}>
            <Image
              className={styles.creatorImage}
              src={image}
              alt="Creator avatar"
              width={size - 10}
              height={size - 10}
            />
            <span className={styles.creatorUserName}>By {name}</span>
          </a>
        </Link>
      </header>
    </>
  )
}
