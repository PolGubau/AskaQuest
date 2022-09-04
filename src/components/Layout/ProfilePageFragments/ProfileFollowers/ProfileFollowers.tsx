import React from 'react'
import UserHeader from 'src/components/UserHeader/UserHeader'
import styles from './ProfileFollowers.module.css'
export default function ProfileFollowers ({
  userName,
  followers,
  you = false
}: {
  userName: string
  followers: string[] | null
  you: boolean
}) {
  return (
    <>
      {followers && followers.length > 0
        ? (
        <div className={styles.container}>
          {you
            ? (<>
              {(followers.length > 1) && <p>{`Some of your ${followers.length} followers:`}</p>}
              { (followers.length === 1) && <p>{'Your follower:'}</p>}
              </>
              )

            : (
            <p>{`Some of ${userName}'s followers:`}</p>
              )}

          <div className={styles.followersContainer}>
            {followers
              .map((followerID: string) => {
                return (
                  <UserHeader
                    key={followerID}
                    searchById={{ state: true, id: followerID }}
                    you={false}
                    size={40}
                    name={''}
                    image={''}
                  />
                )
              })
              .slice(0, 3)}
          </div>
        </div>
          )
        : (
        `Be the first one to follow ${userName}!`
          )}
    </>
  )
}
