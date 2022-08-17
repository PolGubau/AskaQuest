import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './userHeader.module.css'
import { AiFillHeart } from 'react-icons/ai'

export default function UserHeader({
  username = 'Anonymous',
  userimage = 'https://api.multiavatar.com/Anonymous.svg',
  likes = undefined
}) {
  return (
    <>
      <header className={styles.container}>
        <Link href={`/profile/${username}`}>
          <a className={styles.creator}>
            <Image
              className={styles.creatorImage}
              src={userimage}
              alt="Creator avatar"
              width={30}
              height={30}
            />
            <span className={styles.creatorUserName}>{username}</span>
          </a>
        </Link>
        {likes && (
          <div className={styles.likes}>
            <p className={styles.likesText}>{likes}</p>
            <AiFillHeart className={styles.likesIcon} color="red" />
          </div>
        )}
      </header>
    </>
  )
}
